import { body } from "express-validator";
import { CheckEmailExist, CheckEmailExistIgnoreId } from "../services/UserService";

export const addUserValidator =
    [
        body('email')
            .notEmpty().withMessage("Email required").bail()
            .isEmail().withMessage("Enter valid email")
            .custom(async (email) => {
                const check = await CheckEmailExist(email);
                if (check) throw new Error("Email sudah digunakan.");
                return true;
            }),
        body('password').notEmpty().withMessage("Password required").bail()
            .isLength({ min: 8 }).withMessage("Password minimal 8 karakter."),
        body('nama').notEmpty().withMessage("Nama required"),
        body('role').notEmpty().withMessage("Role required")
    ];
export const updateUserValidator =
    [
        body('email')
            .notEmpty().withMessage("Email is required.").bail()
            .isEmail().withMessage("Enter valid email").bail()
            .custom(async (email, { req }) => {
                const check = await CheckEmailExistIgnoreId(email, req.params?.id);
                if (check) throw new Error("Email sudah digunakan.");
                return true;
            }),
        body('nama').notEmpty().withMessage("Name required"),
        body('role').notEmpty().withMessage("Role required")
    ];