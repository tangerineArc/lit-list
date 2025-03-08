"use strict";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

import validateBook from "../validators/book-validator.js";

const renderBooksPage = asyncHandler(async (req, res) => {
  const books = await db.selectAllBooks();

  res.render("index.ejs", {
    title: "Stampede | Books",
    selection: "books",
    path: ["Categories", "Books"],
    books,
    formatDate,
  });
});

const renderBookDescriptionPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { details, authors, genres } = await db.selectBookDetailsById(
    Number(id)
  );

  res.render("index.ejs", {
    title: "Stampede | Books",
    selection: "book-details",
    path: ["Categories", "Books", details.name],
    details,
    authors,
    genres,
    formatDate,
  });
});

const renderCreateBookFormPage = asyncHandler(async (req, res) => {
  const authors = await db.selectAllAuthors();
  const genres = await db.selectAllGenres();

  res.render("create-form.ejs", {
    title: "Stampede | Books",
    selection: "new-book",
    path: ["New", "Book"],
    actionRoute: "/books/new",
    authors,
    genres,
  });
});

const saveNewBook = [
  validateBook,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(" :: ")
      );
    }

    const { name, stock, price, publicationdate, authors, genres } = req.body;

    let authorsArray;
    if (authors instanceof Array) {
      authorsArray = authors.map((id) => Number(id));
    } else {
      authorsArray = [Number(authors)];
    }

    let genresArray;
    if (genres instanceof Array) {
      genresArray = genres.map((id) => Number(id));
    } else {
      genresArray = [Number(genres)];
    }

    const bookId = await db.insertBook({
      name: name.trim(),
      stock: Number(stock),
      price: Number(Number(price).toFixed(2)),
      publicationdate: new Date(publicationdate).toISOString(),
      authors: authorsArray,
      genres: genresArray,
    });

    res.redirect(`/books/${bookId}`);
  }),
];

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteBook({ id });

  res.redirect("/books");
});

const renderEditBookFormPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await db.selectBookDetailsById(id);

  const authors = await db.selectAllNonAuthorsForBookId(id);
  const genres = await db.selectAllNonGenresForBookId(id);

  res.render("create-form.ejs", {
    title: "Stampede | Books",
    selection: "edit-book",
    path: ["Categories", "Books", existing.details.name, "Edit"],
    actionRoute: `/books/${id}/edit`,
    existing,
    authors,
    genres,
  });
});

const updateBook = [
  validateBook,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(" :: ")
      );
    }

    const { id } = req.params;

    const { name, stock, price, publicationdate, authors, genres } = req.body;

    let authorsArray;
    if (authors instanceof Array) {
      authorsArray = authors.map((id) => Number(id));
    } else {
      authorsArray = [Number(authors)];
    }

    let genresArray;
    if (genres instanceof Array) {
      genresArray = genres.map((id) => Number(id));
    } else {
      genresArray = [Number(genres)];
    }

    await db.updateBook({
      id,
      name: name.trim(),
      stock: Number(stock),
      price: Number(Number(price).toFixed(2)),
      publicationdate: new Date(publicationdate).toISOString(),
      authors: authorsArray,
      genres: genresArray,
    });

    res.redirect(`/books/${id}`);
  }),
];

export {
  deleteBook,
  renderBookDescriptionPage,
  renderBooksPage,
  renderCreateBookFormPage,
  renderEditBookFormPage,
  saveNewBook,
  updateBook,
};
