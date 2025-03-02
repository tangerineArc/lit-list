"use strict";

import { Router } from "express";

import { renderDashboardPage } from "../controllers/index-controller.js";

const indexRouter = Router();

indexRouter.get("/", renderDashboardPage);

export default indexRouter;
