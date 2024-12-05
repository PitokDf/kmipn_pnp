import { body } from "express-validator";

export const updateCategoriValidator = [
    body("categoriName").notEmpty({ ignore_whitespace: true }).withMessage("Category name required.")
]