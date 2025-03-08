"use strict";

import { query } from "express-validator";

const validateSearch = [
  query("searchTerm")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Search term cannot be empty"),
];

export default validateSearch;
