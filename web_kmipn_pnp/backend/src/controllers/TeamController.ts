import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { createTeamService, getDataTeamService } from "../services/TeamService";
import { db } from "../config/database";

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

export const deleteTeamController = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;

        const team = await db.team.findFirst({
            where: { id: Number(id) }
        })

        if (!team) return res.status(404).json({
            success: false,
            statusCode: 404,
            msg: "team tidak ditemukan"
        })

        const deleteTeam = await db.team.delete({ where: { id: team.id } })
        return res.status(200).json({ success: true, statusCode: 200, msg: `Berhasil mengapus team ${team.name}`, data: deleteTeam })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error.",
            data: null,
            errors: error.message
        })
    }
}