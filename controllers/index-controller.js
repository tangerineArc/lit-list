"use strict";

import asyncHandler from "express-async-handler";

import * as db from "../db/queries.js";

import formatDate from "../utils/format-date.js";

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

const renderSearchPage = async (req, res) => {
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
};

export { renderDashboardPage, renderSearchPage };
