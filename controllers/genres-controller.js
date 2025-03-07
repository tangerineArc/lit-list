"use strict";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import * as db from "../db/queries.js";

import validateGenre from "../validators/genre-validator.js";

const renderGenresPage = asyncHandler(async (req, res) => {
  const genres = await db.selectAllGenres();

  res.render("index.ejs", {
    title: "Stampede | Genres",
    selection: "genres",
    path: ["Categories", "Genres"],
    genres,
  });
});

const renderGenreDescriptionPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { details, books } = await db.selectGenreDetailsById(Number(id));

  res.render("index.ejs", {
    title: "Stampede | Genres",
    selection: "genre-details",
    path: ["Categories", "Genres", details.type],
    details,
    books,
  });
});

const renderCreateGenreFormPage = (req, res) => {
  res.render("create-form.ejs", {
    title: "Stampede | Genres",
    selection: "new-genre",
    path: ["New", "Genre"],
    actionRoute: "/genres/new",
  });
};

const saveNewGenre = [
  validateGenre,
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

    const { type } = req.body;

    const genreId = await db.insertGenre({
      type: type.trim(),
    });

    res.redirect(`/genres/${genreId}`);
  }),
];

const deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteGenre({ id });

  res.redirect("/genres");
});

const renderEditGenreFormPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await db.selectGenreDetailsById(id);

  res.render("create-form.ejs", {
    title: "Stampede | Genres",
    selection: "edit-genre",
    path: ["Categories", "Genres", existing.details.type, "Edit"],
    actionRoute: `/genres/${id}/edit`,
    existing,
  });
});

const updateGenre = [
  validateGenre,
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

    const { type } = req.body;

    await db.updateGenre({
      id,
      type: type.trim(),
    });

    res.redirect(`/genres/${id}`);
  }),
];

export {
  deleteGenre,
  renderCreateGenreFormPage,
  renderEditGenreFormPage,
  renderGenreDescriptionPage,
  renderGenresPage,
  saveNewGenre,
  updateGenre,
};
