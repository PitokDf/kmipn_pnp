import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { createProposalService, deleteProposalService, getAllproposalAproveServices, getProposalService, updateProposalService } from "../services/ProposalService";
import { userLogin } from "../config/jwt";
import { findCategory } from "../services/CategoriService";
import archiver from "archiver";
import { existsSync, unlink } from "fs";
import { uploadDir } from "../middlewares/mutlerUploadFile";
import path from "path";
import { pusher } from "../config/pusher";

export const createProposal = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const user = await userLogin(req);
        const teamID = user.teamMember?.teamId;
        const category = await findCategory(user.teamMember?.team.categoryID!);
        const deadline = category?.deadline;

        if (new Date(deadline!).getTime() < new Date().getTime()) {
            return res.status(403).json({ success: true, statusCode: 403, msg: "Sudah lewat waktu pengumpulan" })
        }

        const allowedMimeType = ["application/pdf"];
        const file_proposal = req.file;

        if (!allowedMimeType.includes(file_proposal?.mimetype!)) {
            unlink(file_proposal?.path!, (error) => {
                if (error) console.error("Gagal menghapus file")
            });
            return res.status(403).json({
                success: false,
                statusCode: 403,
                msg: "Proposal hanya boleh pdf yaa, nggak boleh yang lain."
            })
        }
        const { type } = req.query;
        const file = req.file;
        const filePath = file?.path.split("/").slice(1, 3).join("/");
        const fileLink = `${process.env.BASEURl}/${type}/${req.file?.filename}`;
        const proposal = await
            createProposalService(Number(teamID), String(fileLink), file?.filename!, file?.size!, file?.mimetype!, file?.originalname!, filePath!);
        return res.status(201).json({ success: true, statusCode: 201, msg: "successfully save proposal", data: proposal })
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

export const getAllproposal = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const proposals = await getProposalService();
        return res.status(200).json({
            success: true,
            statusCode: 200, msg: "Berhasil mendapatkan data.",
            data: proposals
        });
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

export const deleteProposal = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const deletedProposal = await deleteProposalService(Number(id));
        return res.status(200).json({
            success: true,
            statusCode: 200, msg: "Berhasil menghapus proposal.",
            data: deletedProposal
        });
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

export const updateProposal = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const { status, comments } = req.body
        const updatedProposal = await updateProposalService(Number(id), status, comments);
        await pusher.trigger(`team-${updatedProposal.teamId}`, "proposal-status", {
            status,
            message: status === "approve" ? "Proposal tim anda telah disetujui." :
                "Proposal tim anda ditolak, silahkan kirim ulang proposal!."
        });
        return res.status(200).json({
            success: true,
            statusCode: 200, msg: "Berhasil approve proposal.",
            data: updatedProposal
        });
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

export const downloadAllProposal = async (req: Request, res: Response) => {
    try {
        const approvedProposal = await getAllproposalAproveServices();
        const archive = archiver("zip", { zlib: { level: 9 } });
        res.attachment("approved-proposal.zip");
        archive.pipe(res);
        approvedProposal.forEach((proposal) => {
            const filePath = path.join(uploadDir, proposal.file.path);
            if (!existsSync(filePath)) {
                console.log(`file tidak ditemukan ${filePath}`);
                return
            }
            archive.file(filePath, { name: `${proposal.team.name.split(" ").join("-").toLocaleLowerCase()}-${proposal.file.originalName}` })
        });

        await archive.finalize()
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: error.message
        });
    }
}