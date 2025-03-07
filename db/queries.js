"use strict";

import pool from "./pool.js";

async function selectAllBooks() {
  const { rows } = await pool.query("SELECT * FROM book");
  return rows;
}

async function selectAllAuthors() {
  const { rows } = await pool.query("SELECT * FROM author");
  return rows;
}

async function checkAuthorIdExistence(id) {
  const { rows } = await pool.query(
    " SELECT exists (SELECT 1 FROM author WHERE id = $1 LIMIT 1)",
    [id]
  );
  return rows[0].exists;
}

async function selectAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

async function checkGenreIdExistence(id) {
  const { rows } = await pool.query(
    " SELECT exists (SELECT 1 FROM genre WHERE id = $1 LIMIT 1)",
    [id]
  );
  return rows[0].exists;
}

async function selectStockSum() {
  const { rows } = await pool.query("SELECT SUM(stock) AS stock_sum FROM book");
  return rows[0].stock_sum;
}

async function selectBookCount() {
  const { rows } = await pool.query("SELECT COUNT(*) AS book_count FROM book");
  return rows[0].book_count;
}

async function selectAuthorCount() {
  const { rows } = await pool.query(
    "SELECT COUNT(*) AS author_count FROM author"
  );
  return rows[0].author_count;
}

async function selectGenreCount() {
  const { rows } = await pool.query(
    "SELECT COUNT(*) AS genre_count FROM genre"
  );
  return rows[0].genre_count;
}

async function selectPriceSum() {
  const { rows } = await pool.query(
    "SELECT SUM(price * stock) AS total_cost FROM book"
  );
  return rows[0].total_cost;
}

async function selectCountLowStock() {
  const { rows } = await pool.query(
    "SELECT COUNT(*) AS low_stock_count FROM book WHERE stock BETWEEN 1 AND 5"
  );
  return rows[0].low_stock_count;
}

async function selectOutOfStockCount() {
  const { rows } = await pool.query(
    " SELECT COUNT(*) AS out_of_stock_count FROM book WHERE stock = 0"
  );
  return rows[0].out_of_stock_count;
}

async function selectBookDetailsById(id) {
  const { rows: rows1 } = await pool.query("SELECT * FROM book WHERE id = $1", [
    id,
  ]);
  const { rows: rows2 } = await pool.query(
    "SELECT id, name FROM author WHERE id IN (SELECT authorId FROM book_author_relation WHERE bookId = $1)",
    [id]
  );
  const { rows: rows3 } = await pool.query(
    "SELECT id, type FROM genre WHERE id IN (SELECT genreId FROM book_genre_relation WHERE bookId = $1)",
    [id]
  );

  return { details: rows1[0], authors: rows2, genres: rows3 };
}

async function selectAuthorDetailsById(id) {
  const { rows: rows1 } = await pool.query(
    "SELECT * FROM author WHERE id = $1",
    [id]
  );
  const { rows: rows2 } = await pool.query(
    "SELECT id, name FROM book WHERE id IN (SELECT bookId FROM book_author_relation WHERE authorId = $1)",
    [id]
  );

  return { details: rows1[0], books: rows2 };
}

async function selectGenreDetailsById(id) {
  const { rows: rows1 } = await pool.query(
    "SELECT * FROM genre WHERE id = $1",
    [id]
  );
  const { rows: rows2 } = await pool.query(
    "SELECT id, name FROM book WHERE id IN (SELECT bookId FROM book_genre_relation WHERE genreId = $1)",
    [id]
  );

  return { details: rows1[0], books: rows2 };
}

async function insertBook({
  name,
  stock,
  price,
  publicationdate,
  authors,
  genres,
}) {
  const { rows } = await pool.query(
    "INSERT INTO book ( name, stock, price, publicationDate ) VALUES ( $1, $2, $3, $4 ) RETURNING id",
    [name, stock, price, publicationdate]
  );
  const bookId = rows[0].id;

  const authorPromises = [];
  authors.forEach((authorId) => {
    authorPromises.push(
      pool.query(
        "INSERT INTO book_author_relation ( bookId, authorId ) VALUES ( $1, $2 )",
        [bookId, authorId]
      )
    );
  });

  const genrePromises = [];
  genres.forEach((genreId) => {
    genrePromises.push(
      pool.query(
        "INSERT INTO book_genre_relation ( bookId, genreId ) VALUES ( $1, $2 )",
        [bookId, genreId]
      )
    );
  });

  await Promise.all(authorPromises.concat(genrePromises));
  return bookId;
}

async function insertAuthor({ name, birthdate }) {
  const { rows } = await pool.query(
    "INSERT INTO author ( name, birthDate ) VALUES ( $1, $2 ) RETURNING id",
    [name, birthdate]
  );
  const authorId = rows[0].id;

  return authorId;
}

async function insertGenre({ type }) {
  const { rows } = await pool.query(
    "INSERT INTO genre ( type ) VALUES ( $1 ) RETURNING id",
    [type]
  );
  const genreId = rows[0].id;

  return genreId;
}

async function deleteBook({ id }) {
  await pool.query("DELETE FROM book_author_relation WHERE bookId = $1", [id]);
  await pool.query("DELETE FROM book_genre_relation WHERE bookId = $1", [id]);
  await pool.query("DELETE FROM book WHERE id = $1", [id]);
}

async function deleteAuthor({ id }) {
  await pool.query("DELETE FROM book_author_relation WHERE authorId = $1", [
    id,
  ]);
  await pool.query("DELETE FROM author WHERE id = $1", [id]);
}

async function deleteGenre({ id }) {
  await pool.query("DELETE FROM book_genre_relation WHERE genreId = $1", [id]);
  await pool.query("DELETE FROM genre WHERE id = $1", [id]);
}

async function selectAllNonAuthorsForBookId(id) {
  const { rows } = await pool.query(
    "SELECT id, name FROM author WHERE id NOT IN (SELECT authorId FROM book_author_relation WHERE bookId = $1)",
    [id]
  );
  return rows;
}

async function selectAllNonGenresForBookId(id) {
  const { rows } = await pool.query(
    "SELECT id, type FROM genre WHERE id NOT IN (SELECT genreId FROM book_genre_relation WHERE bookId = $1)",
    [id]
  );
  return rows;
}

async function updateBook({
  id,
  name,
  stock,
  price,
  publicationdate,
  authors,
  genres,
}) {
  await pool.query(
    "UPDATE book SET name = $1, stock = $2, price = $3, publicationdate = $4 WHERE id = $5",
    [name, stock, price, publicationdate, id]
  );

  await pool.query("DELETE FROM book_author_relation WHERE bookId = $1", [id]);
  await pool.query("DELETE FROM book_genre_relation WHERE bookId = $1", [id]);

  const authorPromises = [];
  authors.forEach((authorId) => {
    authorPromises.push(
      pool.query(
        "INSERT INTO book_author_relation ( bookId, authorId ) VALUES ( $1, $2 )",
        [id, authorId]
      )
    );
  });

  const genrePromises = [];
  genres.forEach((genreId) => {
    genrePromises.push(
      pool.query(
        "INSERT INTO book_genre_relation ( bookId, genreId ) VALUES ( $1, $2 )",
        [id, genreId]
      )
    );
  });

  await Promise.all(authorPromises.concat(genrePromises));
}

async function updateAuthor({ id, name, birthdate }) {
  await pool.query(
    "UPDATE author SET name = $1, birthdate = $2 WHERE id = $3",
    [name, birthdate, id]
  );
}

async function updateGenre({ id, type }) {
  await pool.query("UPDATE genre SET type = $1 WHERE id = $2", [type, id]);
}

async function selectAllBooksLike(searchTerm) {
  const { rows } = await pool.query(
    "SELECT * FROM book WHERE name ILIKE '%' || $1 || '%'",
    [searchTerm]
  );
  return rows;
}

async function selectAllAuthorsLike(searchTerm) {
  const { rows } = await pool.query(
    "SELECT * FROM author WHERE name ILIKE '%' || $1 || '%'",
    [searchTerm]
  );
  return rows;
}

async function selectAllGenresLike(searchTerm) {
  const { rows } = await pool.query(
    "SELECT * FROM genre WHERE type ILIKE '%' || $1 || '%'",
    [searchTerm]
  );
  return rows;
}

export {
  checkAuthorIdExistence,
  checkGenreIdExistence,
  deleteAuthor,
  deleteBook,
  deleteGenre,
  insertAuthor,
  insertBook,
  insertGenre,
  selectAllAuthors,
  selectAllAuthorsLike,
  selectAllBooks,
  selectAllBooksLike,
  selectAllGenres,
  selectAllGenresLike,
  selectAllNonAuthorsForBookId,
  selectAllNonGenresForBookId,
  selectAuthorCount,
  selectAuthorDetailsById,
  selectBookCount,
  selectBookDetailsById,
  selectCountLowStock,
  selectGenreCount,
  selectGenreDetailsById,
  selectOutOfStockCount,
  selectPriceSum,
  selectStockSum,
  updateAuthor,
  updateBook,
  updateGenre,
};
