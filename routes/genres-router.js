"use strict";

import { Router } from "express";

import {
  deleteGenre,
  renderCreateGenreFormPage,
  renderEditGenreFormPage,
  renderGenreDescriptionPage,
  renderGenresPage,
  saveNewGenre,
  updateGenre,
} from "../controllers/genres-controller.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/new", renderCreateGenreFormPage);
genresRouter.post("/new", saveNewGenre);
genresRouter.get("/:id", renderGenreDescriptionPage);
genresRouter.post("/:id/delete", deleteGenre);
genresRouter.get("/:id/edit", renderEditGenreFormPage);
genresRouter.post("/:id/edit", updateGenre);

export default genresRouter;
