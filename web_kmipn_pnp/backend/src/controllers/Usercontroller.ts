import { NextFunction, Request, Response } from "express";
import { addUserService, Delete, editUSer, GetAllUser, GetByID } from "../services/UserService";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/HashPassword";
import { validationResult } from "express-validator";
import { userLogin } from "../config/jwt";

export const AllUser = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const users = await GetAllUser();
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully get data", data: users });
    } catch (error: any) {
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error", errors: error.message });
    }
}

export const GetUserById = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const params = req.params;
        const user = await GetByID(String(params.id));
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully get data", data: user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message })
        } else {
            return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
        }
    }
}

export const CheckUserTeam = async (req: Request, res: Response) => {
    try {
        const sessionUser = await userLogin(req);
        const user = await GetByID(sessionUser.id);
        const completed = user.teamMember !== null ? true : false;
        return res.status(200).json({ success: true, statusCode: 200, complete: completed });
    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
    }
}

export const DeleteUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const userIdLogin = await userLogin(req);

        if (id === userIdLogin?.id) {
            throw new AppError("Can't delete your own account.", 400);
        }
        const user = await Delete(id);
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully delete user " + user.name })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message })
        } else {
            return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
        }
    }
}

export const updateUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Validation require", errors: errors.array() });
        }
        const { id } = req.params
        const { email, password, nama, role } = req.body
        let hashedPassword = null
        if (password) {
            hashedPassword = await hashPassword(password);
        }

        await editUSer(id, email, hashedPassword, nama, role);

        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully update user" });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message, errors: error.message });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" + error })
    }
}

export const addUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Validation require", errors: errors.array() });
        }
        const { nama, password, role, email } = req.body

        const hashedPassword = await hashPassword(password);
        const user = await addUserService(email, hashedPassword, nama, role);
        return res.status(201).json({ success: true, statusCode: 201, msg: "Successfully add new user, silahkan beritahu user untuk memverifikasi emailnya", data: user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message, errors: error.message });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" + error })
    }
}