"use strict";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

import validateAuthor from "../validators/author-validator.js";

const renderAuthorsPage = asyncHandler(async (req, res) => {
  const authors = await db.selectAllAuthors();

  res.render("index.ejs", {
    title: "Stampede | Authors",
    selection: "authors",
    path: ["Categories", "Authors"],
    authors,
    formatDate,
  });
});

const renderAuthorDescriptionPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { details, books } = await db.selectAuthorDetailsById(Number(id));

  res.render("index.ejs", {
    title: "Stampede | Authors",
    selection: "author-details",
    path: ["Categories", "Authors", details.name],
    details,
    books,
    formatDate,
  });
});

const renderCreateAuthorFormPage = (req, res) => {
  res.render("create-form.ejs", {
    title: "Stampede | Authors",
    selection: "new-author",
    path: ["New", "Author"],
    actionRoute: "/authors/new",
  });
};

const saveNewAuthor = [
  validateAuthor,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
    }

    const { name, birthdate } = req.body;

    const authorId = await db.insertAuthor({
      name: name.trim(),
      birthdate: new Date(birthdate).toISOString(),
    });

    res.redirect(`/authors/${authorId}`);
  }),
];

const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteAuthor({ id });

  res.redirect("/authors");
});

const renderEditAuthorFormPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await db.selectAuthorDetailsById(id);

  res.render("create-form.ejs", {
    title: "Stampede | Authors",
    selection: "edit-author",
    path: ["Categories", "Authors", existing.details.name, "Edit"],
    actionRoute: `/authors/${id}/edit`,
    existing,
  });
});

const updateAuthor = [
  validateAuthor,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
    }

    const { id } = req.params;

    const { name, birthdate } = req.body;

    await db.updateAuthor({
      id,
      name: name.trim(),
      birthdate: new Date(birthdate).toISOString(),
    });

    res.redirect(`/authors/${id}`);
  }),
];

export {
  deleteAuthor,
  renderCreateAuthorFormPage,
  renderAuthorDescriptionPage,
  renderAuthorsPage,
  renderEditAuthorFormPage,
  saveNewAuthor,
  updateAuthor,
};
