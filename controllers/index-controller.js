"use strict";

import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

import * as db from "../db/queries.js";

const validateExample = [
  body("example_text")
    .trim()
    .isAlpha()
    .withMessage("Example must only contain letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("Example must be between 1 and 10 characters"),
];

const getExamples = asyncHandler(async (req, res) => {
  const examples = await db.getALlExamples();
  res.render("index.ejs", { examples });
});

function createExampleGet(req, res) {
  res.render("create-example.ejs", { title: "Create Example" });
}

const createExamplePost = [
  validateExample,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array().map(error => error.msg).join(", "));
    }

    console.log("h2");
    const { example_text } = req.body;
    await db.insertExample(example_text);
    res.redirect("/");
  }),
];

export { createExampleGet, createExamplePost, getExamples };
