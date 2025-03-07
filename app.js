"use strict";

import "dotenv/config";
import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import authorsRouter from "./routes/authors-router.js";
import booksRouter from "./routes/books-router.js";
import genresRouter from "./routes/genres-router.js";
import indexRouter from "./routes/index-router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

/* set up view engine */
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

/* serve static assets */
app.use(express.static(join(__dirname, "public")));

/* parse form-data */
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);

/* error handlers */
app.all("*", (req, res) => {
  res.status(404).render("error.ejs", { status: 404 });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(err.statusCode || 500)
    .render("error.ejs", { status: err.statusCode || 500 });
});

/* startup */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
