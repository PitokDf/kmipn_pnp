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
import fs from "fs";
import { $Enums } from "@prisma/client";
import { pusher } from "../config/pusher";
import { createObjectCsvWriter } from "csv-writer";
import { format } from "@fast-csv/format";
import { uploadFileToDrive } from "../services/GoogleDriveServices";

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

        if (!body.nama_dosen || !body.nip_dosen || !body.nama_tim || !body.kategori_lomba || !body.asal_politeknik) {

            // const files = req.files as Record<string, Express.Multer.File[]>;
            // for (const key in files) {
            //     files[key].forEach((file: Express.Multer.File) => {
            //         const filePath = path.join(__dirname, '../../', file.path);
            //         fs.unlink(filePath, (err) => {
            //             if (err) {
            //                 console.error("Error while deleting file:", err);
            //             } else {
            //                 console.log(`File ${file.filename} deleted successfully`);
            //             }
            //         });
            //     });
            // }

            return res.status(400).json({
                success: false,
                statusCode: 400,
                msg: "Isi semua bidang yang yang dibutuhkan!"
            })
        }

        const dataLecture = {
            name: body.nama_dosen,
            nip: body.nip_dosen
        }
        const dataTeam = {
            name: body.nama_tim,
            categoryID: body.kategori_lomba,
            institution: body.asal_politeknik
        }


        const user = await userLogin(req);
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_KTM_ID || ""
        const files = req.files as Record<string, Express.Multer.File[]>;
        const clientInputMembers: clientInput[] = body.members;
        let dataMembers: members[] = [];
        let index = 0;

        for (const fieldName in files) {
            if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
                const file = files[fieldName][0];
                const fileBuffer = file.buffer;
                const fileName = file.originalname;
                const mimeType = file.mimetype;
                const member = clientInputMembers[index];
                const uploadResult = await uploadFileToDrive(fileBuffer, fileName, mimeType, folderId)

                dataMembers.push({
                    email: member.email,
                    userId: index === 0 ? user.id : null,
                    no_WA: member.no_wa,
                    prodi: member.prodi,
                    teamId: 0,
                    role: index === 0 ? "leader" : "member",
                    name: member.nama_anggota,
                    nim: member.nim,
                    fileKTM: `https://drive.google.com/uc?id=${uploadResult.id}`
                })

                index++;
            }
        }

        console.log(dataMembers);


        // const clientInputMembers: clientInput[] = body.members;
        // const dataMembers: members[] = clientInputMembers.map((member, index: number) => {
        //     const fieldName = `ktm_agg${index + 1}`;
        //     const file = files[fieldName]?.[0];
        //     return {
        //         teamId: 0,
        //         userId: index === 0 ? user.id : null,
        //         no_WA: member.no_wa,
        //         prodi: member.prodi,
        //         email: member.email,
        //         role: index === 0 ? "leader" : "member",
        //         nim: member.nim,
        //         name: member.nama_anggota,
        //         fileKTM: `${process.env.BASEURl}/${file.path.split("/").filter((filter) => filter !== "public").join("/")}`
        //     }
        // })

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
        }, { timeout: 10000 })

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
            proposalName: lastestProposal?.title || null,
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
        await pusher.trigger(`team-${teamID}`, "team-verify", {
            message: "Tim kamu baru saja di verifikasi oleh admin KMIPN."
        });

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

export const generateAttedance = async () => {
    const attendace = await db.teamMember.findMany({
        select: {
            name: true, nim: true, prodi: true, team: { select: { name: true, institution: true } }
        }
    });

    const filePath = 'attendace.csv';
    const csvWritter = createObjectCsvWriter({
        path: filePath,
        header: [
            { id: 'name', title: "Nama" },
            { id: 'nim', title: "NIM" },
            { id: 'prodi', title: "Prodi" },
            { id: 'teamName', title: "Nama Team" },
            { id: 'institution', title: "Asal Politeknik" }
        ]
    });

    const records = attendace.map((member) => ({
        name: member.name,
        nim: member.nim,
        prodi: member.prodi,
        teamName: member.team.name,
        institution: member.team.institution
    }));

    await csvWritter.writeRecords(records);
}

export const downloadAttendace = async (req: Request, res: Response) => {
    try {
        // Ambil data dari database
        const attendance = await db.teamMember.findMany({
            select: {
                name: true,
                nim: true,
                prodi: true,
                team: {
                    select: {
                        name: true,
                        institution: true,
                    },
                },
            },
            where: {
                team: {
                    NOT: { verified: false }
                }
            },
            orderBy: {
                team: { name: "asc" }
            }
        });

        // Set header untuk download file
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="attendance.csv"');

        // Stream CSV ke client
        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        // Masukkan data ke stream
        attendance.forEach((member) => {
            csvStream.write({
                Name: member.name,
                NIM: member.nim,
                Prodi: member.prodi,
                'Team Name': member.team.name,
                Institution: member.team.institution,
            });
        });

        // Akhiri stream
        csvStream.end();
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).json({ message: 'Error generating CSV' });
    }
}