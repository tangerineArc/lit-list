#! /usr/bin/env node

"use strict";

import "dotenv/config";
import pg from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS book (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  stock INTEGER,
  price MONEY,
  publicationDate DATE
);

CREATE TABLE IF NOT EXISTS author (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  birthDate DATE
);

CREATE TABLE IF NOT EXISTS genre (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS book_author_relation (
  bookId INTEGER,
  authorId INTEGER,
  FOREIGN KEY ( bookId ) REFERENCES book ( id ),
  FOREIGN kEY ( authorId ) REFERENCES author ( id )
);

CREATE TABLE IF NOT EXISTS book_genre_relation (
  bookId INTEGER,
  genreId INTEGER,
  FOREIGN KEY ( bookId ) REFERENCES book ( id ),
  FOREIGN kEY ( genreId ) REFERENCES genre ( id )
);
`;

async function main() {
  console.log("dwelling started ...");

  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... dwelling finished");
}

main();
