"use strict";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

import validateSearch from "../validators/search-validator.js";

const renderDashboardPage = asyncHandler(async (req, res) => {
  const stockSum = await db.selectStockSum();
  const bookCount = await db.selectBookCount();
  const authorCount = await db.selectAuthorCount();
  const genreCount = await db.selectGenreCount();
  const totalCost = await db.selectPriceSum();
  const lowStockCount = await db.selectCountLowStock();
  const outOfStockCount = await db.selectOutOfStockCount();

  res.render("index.ejs", {
    title: "Stampede | Dashboard",
    selection: "dashboard",
    path: ["Dashboard"],
    stockSum,
    bookCount,
    authorCount,
    genreCount,
    totalCost: totalCost.slice(1).split("."),
    lowStockCount,
    outOfStockCount,
  });
});

const renderSearchPage = [
  validateSearch,
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

    const { searchTerm } = req.query;

    const books = await db.selectAllBooksLike(searchTerm.trim());
    const authors = await db.selectAllAuthorsLike(searchTerm.trim());
    const genres = await db.selectAllGenresLike(searchTerm.trim());

    res.render("search.ejs", {
      title: "Stampede | Search",
      selection: "search",
      path: ["Search", searchTerm],
      searchTerm,
      books,
      authors,
      genres,
      formatDate,
    });
  }),
];

export { renderDashboardPage, renderSearchPage };
