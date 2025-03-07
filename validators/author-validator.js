import { body } from "express-validator";

const validateAuthor = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Author name cannot be empty"),
  body("birthdate")
    .trim()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Birthdate must be a date with format 'YYYY-MM-DD'")
    .isBefore(new Date().toISOString())
    .withMessage("Birthdate cannot be a future date"),
];

export default validateAuthor;
