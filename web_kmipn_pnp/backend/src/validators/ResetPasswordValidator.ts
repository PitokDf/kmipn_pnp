import { body } from "express-validator";

export const ResetPasswordValidator = [
    body("email").notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage("Masukkan email yang valid")
]

export const resetPasswords = [
    body("password").isLength({ min: 8 })
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter, ")
        .matches(/[A-Z]/).withMessage("one uppercase letter, ")
        .matches(/[0-9]/).withMessage("one number, ")
        .matches(/[\W_]/).withMessage("one symbol")
]