"use strict";

import "dotenv/config";
import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

/* error handlers */
app.all("*", (req, res) => {
  res.send("No such page: Error 404");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

/* startup */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
