"use strict";

import { Router } from "express";

import {
  renderDashboardPage,
  renderSearchPage,
} from "../controllers/index-controller.js";

const indexRouter = Router();

indexRouter.get("/", renderDashboardPage);
indexRouter.get("/search", renderSearchPage);

export default indexRouter;
