import { body } from "express-validator";
import { CheckEmailExist } from "../services/UserService";

export const RegisterValidator =
    [
        body("name").notEmpty().withMessage("Nama Lengkap is required"),
        body('email').isEmail().withMessage("Email is required").bail()
            .custom(async (email) => {
                const check = await CheckEmailExist(email);
                if (check) throw new Error("Email sudah digunakan.");
                return true;
            }),
        body('password').notEmpty().withMessage("Password is required").bail()
            .isLength({ min: 8 }).withMessage("Password minimal 8 character")
    ];
