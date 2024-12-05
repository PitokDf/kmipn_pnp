import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { createTeamService, getDataTeamService } from "../services/TeamService";
import { statusSubmission } from "@prisma/client";

export const createTeam = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { name, categori, instansi, dosen } = req.body;
        const team = await createTeamService(name, Number(categori), instansi, Number(dosen))
        if (team) return res.status(201).json({ success: true, statusCode: 201, msg: "successfully create team", data: team })
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

export const getDataTeam = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const teamData = await getDataTeamService();
        return res.status(200).json({ success: true, statusCode: 200, msg: "successfully get team data", data: teamData })
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