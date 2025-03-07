"use strict";

import { Router } from "express";

import {
  deleteBook,
  renderBookDescriptionPage,
  renderBooksPage,
  renderCreateBookFormPage,
  renderEditBookFormPage,
  saveNewBook,
  updateBook,
} from "../controllers/books-controller.js";

const booksRouter = Router();

booksRouter.get("/", renderBooksPage);
booksRouter.get("/new", renderCreateBookFormPage);
booksRouter.post("/new", saveNewBook);
booksRouter.get("/:id", renderBookDescriptionPage);
booksRouter.post("/:id/delete", deleteBook);
booksRouter.get("/:id/edit", renderEditBookFormPage);
booksRouter.post("/:id/edit", updateBook);

export default booksRouter;
