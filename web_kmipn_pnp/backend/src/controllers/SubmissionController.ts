import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { getAllSubmissionService } from "../services/SubmissionService";

export const getAllSubmissions = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const submissions = await getAllSubmissionService();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan data",
            data: submissions
        })
    } catch (error) {

    }
}