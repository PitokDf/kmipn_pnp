import { access, unlink } from "fs";
import { db } from "../config/database"
import { AppError } from "../utils/AppError";
import { constants } from "fs/promises";
import path from "path";
import { uploadDir } from "../middlewares/mutlerUploadFile";
import { $Enums } from "@prisma/client";
import { deleteFileFromDrive } from "./GoogleDriveServices";

export const createProposalService =
    async (teamID: number, fileId: string, filelink: string, fileName: string, fileSize: number, type: string, originalName: string, path: string
    ) => {
        const transaction = await db.$transaction(async () => {
            const file = await db.file.create({
                data: {
                    id: fileId, fileName, fileSize, type, originalName, path
                }
            });
            const proposal = await db.proposal.create({ data: { teamId: teamID, fileLink: filelink, fileId: file.id, title: file.originalName.split(".")[0] } });
            return { file, proposal }
        });
        if (!transaction) throw new AppError("Failed create proposal", 400);
        return transaction.file;
    }

export const getProposalService = async () => {
    const proposals = await db.proposal.findMany({ include: { assessment: true, team: true, file: true }, orderBy: { createdAt: "desc" } })
    if (!proposals) throw new AppError("Terjadi masalah saat mengambil data.", 400);
    return proposals;
}

export const deleteProposalService = async (id: number) => {
    const proposal = await db.proposal.findUnique({ where: { id: Number(id) } });
    if (!proposal) throw new AppError("Proposal tidak ditemukan", 400);
    const file = await db.file.findUnique({ where: { id: proposal.fileId } });
    const filePath = path.join(uploadDir, file?.path!);
    console.log("\nfile path:" + filePath);

    await deleteFileFromDrive(file?.id!)
    await db.proposal.delete({ where: { id: Number(id) } });
    await db.file.delete({ where: { id: proposal.fileId } });
    return proposal;
}

export const updateProposalService = async (id: number, status: $Enums.statusProposal, comments?: string) => {
    const proposal = await db.proposal.findUnique({ where: { id: Number(id) } });
    if (!proposal) throw new AppError("Proposal tidak ditemukan", 400);
    if (status === "approve") {
        await db.submission.create({
            data: {
                round: "preliminary",
                teamId: proposal.teamId,
                status: "pending"
            }
        })
    }
    await db.proposal.update({ where: { id: Number(id) }, data: { comments: comments, status } });
    return proposal;
}

export const getAllproposalAproveServices = async () => {
    const approvedProposal = await db.proposal.findMany({
        where: { status: "approve" }, include: { file: true, team: true }
    });

    return approvedProposal;
}