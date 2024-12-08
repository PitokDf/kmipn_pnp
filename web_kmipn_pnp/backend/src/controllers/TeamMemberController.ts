import { Request, Response } from "express"
import { createTeamMember, getTeamMemberByUserIDService } from "../services/TeamMemberService";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { userLogin } from "../config/jwt";
import { unVerifyTeamService, verifyTeamService } from "../services/TeamService";
import path from "path";
import { readHtmlFile } from "../utils/readHtmlFile";
import { replacePlaceholders } from "../utils/replacePlaceholder";
import { sendEmail } from "../utils/NodeMailer";
import { db } from "../config/database";
import { $Enums, Lecture, Team, TeamMember } from "@prisma/client";

type clientInput = {
    nama_anggota: string,
    nim: string,
    no_wa: string,
    email: string,
    prodi: string
}

type members = {
    id?: number;
    teamId: number;
    userId: string | null;
    role: $Enums.RoleTeamMember;
    nim: string;
    name: string;
    email: string;
    no_WA: string;
    prodi: string;
    fileKTM: string;
    createdAt?: Date;
}

export const storeTeamMember = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { type } = req.query;
        const fileName = `${process.env.BASEURl}/${type}/${req.file?.filename}`;
        const { teamId, userId, role, nim, name, email, no_WA, prodi } = req.body;

        const teamMember = await createTeamMember(Number(teamId), userId, role, nim, name, email, no_WA, prodi, fileName!);
        res.cookie("teamDataCompleate", true, { httpOnly: true, secure: true, sameSite: "strict" });
        return res.status(201).json({ success: true, statusCode: 201, msg: "Successfully save team member.", data: teamMember })
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


export const saveTeamMember = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const dataLecture = {
            name: body.nama_dosen,
            nip: body.nip_dosen
        }
        const dataTeam = {
            name: body.nama_tim,
            categoryID: body.kategori_lomba,
            institution: body.asal_politeknik
        }

        const files = req.files as Record<string, Express.Multer.File[]>;

        const user = await userLogin(req);
        console.log(user);

        const clientInputMembers: clientInput[] = body.members;
        const dataMembers: members[] = clientInputMembers.map((member, index: number) => {
            const fieldName = `ktm_agg${index + 1}`;
            const file = files[fieldName]?.[0];
            return {

                teamId: 0,
                userId: index === 0 ? user.id : null,
                no_WA: member.no_wa,
                prodi: member.prodi,
                email: member.email,
                role: index === 0 ? "leader" : "member",
                nim: member.nim,
                name: member.nama_anggota,
                fileKTM: `${process.env.BASEURl}/${file.path.split("/").filter((filter) => filter !== "public").join("/")}`
            }
        })

        const tr = db.$transaction(async () => {
            const newLecture = await db.lecture.create({
                data: {
                    name: dataLecture.name,
                    nip: dataLecture.nip
                }
            });
            const newTeam = await db.team.create(
                {
                    data:
                        { institution: dataTeam.institution, name: dataTeam.name, categoryID: Number(dataTeam.categoryID), lectureID: newLecture.id }
                }
            );

            dataMembers.forEach((member) => {
                member.teamId = newTeam.id;
            })
            await db.teamMember.createMany({ skipDuplicates: true, data: dataMembers })
            return { team_name: newTeam.name }
        })
        return res.status(201).json({
            success: true,
            statusCode: 201,
            msg: "Berhasil menambahkan team dan member baru",
            data: req.files,
            teamDataCompleate: true
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error",
            errors: error.message
        });
    }
}


export const getTeamMemberByUserID = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const user = await userLogin(req);

        const teamMember = await getTeamMemberByUserIDService(String(user.id));
        const lastestProposal = teamMember.team.proposal.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        const isPrposalrejected = lastestProposal?.status === "rejected" ? true : false;
        const submission = teamMember.team.submission;
        const dataMap = {
            teamID: teamMember.teamId,
            teamName: teamMember.team.name,
            categori: teamMember.team.teamCategory.categoriName,
            institution: teamMember.team.institution,
            lectureName: teamMember.team.lecture.name,
            lectureNip: teamMember.team.lecture.nip,
            linkProposal: lastestProposal?.fileLink || null,
            statusProposal: lastestProposal?.status || "Pending",
            statusSubmission: submission?.status === "passed" ? (submission.round === "final" ? "done" : submission.round) : submission?.status || "pending",
            round: submission?.status === "passed" ? (submission.round === "preliminary" ? "pending" : submission.round) : submission?.status || "pending",
            verified: teamMember.team.verified,
            teamMembers: teamMember.team.teamMembers.map((member) => ({
                name: `${member.name}`,
                nim: member.nim,
                email: member.email,
                noWA: member.no_WA,
                role: member.role,
                prodi: member.prodi,
                fileKTM: member.fileKTM
            })),
            isPrposalrejected: isPrposalrejected,
            reasonRejected: lastestProposal?.comments || null
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Successfully get team member",
            data: dataMap
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

export const verifyTeam = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { teamID } = req.params;
        const verifyTeam = await verifyTeamService(Number(teamID));

        const leaderTeam = verifyTeam.teamMembers.filter((member) => { return member.role === "leader" })

        // mengirim email verifikasi ke user
        const filePath = path.join(__dirname, '../templates/TeamVerifyNotif.html')
        let emailContent = await readHtmlFile(filePath);
        const link_to_dashboard = `${process.env.FRONTEND_URL}/participant`;
        emailContent = replacePlaceholders(emailContent, {
            "{{ nama_ketua }}": leaderTeam[0].name,
            "{{ nama_team }}": verifyTeam.name,
            "{{ link_to_dashboard }}": link_to_dashboard
        })
        const sendEmailSuccess = await sendEmail(leaderTeam[0].email, "Team Verified", emailContent);

        // jika email verifikasi gagal terkirim maka lempar error dan hapus user
        if (!sendEmailSuccess) {
            unVerifyTeamService(Number(teamID));
            throw new AppError("Failed send email", 400);
        }

        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully verify team.", data: { verifyTeam, leaderTeam } })
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

export const completeTeam = async (req: Request, res: Response<ResponseApi>) => {

}