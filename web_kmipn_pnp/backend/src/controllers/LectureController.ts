import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { createDosenService } from "../services/LectureService";

export const createLecture = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { name, nip } = req.body;
        const lecture = await createDosenService(name, nip);
        return res.status(201).json({ success: true, statusCode: 201, msg: "successfully create lecture", data: lecture });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            });
        }
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error: " + error
        });
    }
}