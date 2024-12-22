import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { getAllSubmissionService } from "../services/SubmissionService";
import { AppError } from "../utils/AppError";
import { db } from "../config/database";

export const getAllSubmissions = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const submissions = await getAllSubmissionService();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan data",
            data: submissions
        })
    } catch (error: any) {
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
            msg: "Internal server error",
            errors: error.message
        })
    }
}
export const updateStatusRondeController = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;

        const submission = await db.submission.findFirst({ where: { id: Number(id) } });
        if (!submission) return res.status(404).json({
            success: false,
            statusCode: 404,
            msg: "submission tidak ditemukan"
        });

        const { status, round } = req.body;
        const updateSubmission = await db.submission.update({
            data: {
                status: status,
                round: round
            },
            where: { id: submission.id }
        })
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Ronde berhasil dirubah",
            data: updateSubmission
        })
    } catch (error: any) {
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
            msg: "Internal server error",
            errors: error.message
        })
    }
}