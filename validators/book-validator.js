import { body } from "express-validator";

import * as db from "../db/queries.js";

const validateBook = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Book name cannot be empty"),
  body("stock")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0"),
  body("price")
    .trim()
    .isFloat({ min: 0 })
    .withMessage("Price must be a decimal number greater than or equal to 0"),
  body("publicationdate")
    .trim()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Publication date must be a date with format 'YYYY-MM-DD'")
    .isBefore(new Date().toISOString())
    .withMessage("Publication date cannot be a future date"),
  body("authors").custom(async (authors) => {
    if (authors instanceof Array) {
      const promises = [];
      for (let id of authors) {
        id = Number(id);
        if (!Number.isInteger(id)) {
          throw new Error(
            "Author ID must be an integer or an array of integers"
          );
        }

        promises.push(db.checkAuthorIdExistence(id));
      }
      const resolved = await Promise.all(promises);
      const isExisting = resolved.reduce(
        (accumulator, curr) => accumulator && curr,
        true
      );

      if (!isExisting) {
        throw new Error("All authors must be existing");
      }
    } else {
      authors = Number(authors);
      if (!Number.isInteger(authors)) {
        throw new Error("Author ID must be an integer or an array of integers");
      }

      const isExisting = await db.checkAuthorIdExistence(authors);
      if (!isExisting) {
        throw new Error("All authors must be existing");
      }
    }

    return true;
  }),
  body("genres").custom(async (genres) => {
    if (genres instanceof Array) {
      const promises = [];
      for (let id of genres) {
        id = Number(id);
        if (!Number.isInteger(id)) {
          throw new Error(
            "Genre ID must be an integer or an array of integers"
          );
        }

        promises.push(db.checkGenreIdExistence(id));
      }
      const resolved = await Promise.all(promises);
      const isExisting = resolved.reduce(
        (accumulator, curr) => accumulator && curr,
        true
      );

      if (!isExisting) {
        throw new Error("All genres must be existing");
      }
    } else {
      genres = Number(genres);
      if (!Number.isInteger(genres)) {
        throw new Error("Genre ID must be an integer or an array of integers");
      }

      const isExisting = await db.checkGenreIdExistence(genres);
      if (!isExisting) {
        throw new Error("All genres must be existing");
      }
    }

    return true;
  }),
];

export default validateBook;
