import { body } from "express-validator";

const validateGenre = [
  body("type")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Genre type cannot be empty"),
];

export default validateGenre;
