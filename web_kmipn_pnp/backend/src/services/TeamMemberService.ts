import { RoleTeamMember } from "@prisma/client"
import { db } from "../config/database"
import { AppError } from "../utils/AppError";

export const createTeamMember = async (teamId: number, userId: string,
    role: RoleTeamMember, nim: string, name: string, email: string, no_WA: string,
    prodi: string, fileName: string) => {
    const teamMember = await db.teamMember.create({
        data: {
            teamId: teamId, userId: userId, role: role,
            nim: nim, name: name, email: email, no_WA: no_WA, prodi: prodi, fileKTM: fileName
        }
    });

    if (!teamMember) throw new AppError("Failed save team member,", 400);
    return teamMember;
}

export const getTeamMemberByUserIDService = async (userID: string) => {
    const teamMemberByUser = await db.teamMember.findUnique({
        where: { userId: userID }, include: {
            team: { include: { lecture: true, proposal: true, submission: true, teamCategory: true, teamMembers: { orderBy: { role: "asc" } } } },
        }
    });
    if (!teamMemberByUser) throw new AppError("Team member not found", 404);
    return teamMemberByUser;
}