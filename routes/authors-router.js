"use strict";

import { Router } from "express";

import {
  deleteAuthor,
  renderCreateAuthorFormPage,
  renderAuthorDescriptionPage,
  renderAuthorsPage,
  renderEditAuthorFormPage,
  saveNewAuthor,
  updateAuthor,
} from "../controllers/authors-controller.js";

const authorsRouter = Router();

authorsRouter.get("/", renderAuthorsPage);
authorsRouter.get("/new", renderCreateAuthorFormPage);
authorsRouter.post("/new", saveNewAuthor);
authorsRouter.get("/:id", renderAuthorDescriptionPage);
authorsRouter.post("/:id/delete", deleteAuthor);
authorsRouter.get("/:id/edit", renderEditAuthorFormPage);
authorsRouter.post("/:id/edit", updateAuthor);

export default authorsRouter;
