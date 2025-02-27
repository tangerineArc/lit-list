"use strict";

import { Router } from "express";

import {
  getExamples,
  createExampleGet,
  createExamplePost,
} from "../controllers/index-controller.js";

const indexRouter = Router();

indexRouter.get("/", getExamples);
indexRouter.get("/new", createExampleGet);
indexRouter.post("/new", createExamplePost);

export default indexRouter;
