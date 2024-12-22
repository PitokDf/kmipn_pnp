import { Request, Response } from "express";
import { getAllDataCategory } from "../services/CategoriService"
import { getDataTeamService } from "../services/TeamService";
import { getProposalService } from "../services/ProposalService";
import { db } from "../config/database";

export const getInfoDashboardAdmin = async (req: Request, res: Response) => {
    try {
        const recentTeams = await db.team.findMany({
            where: { verified: false },
            orderBy: { createdAt: "desc" }
        })
        const category = await getAllDataCategory();
        const teams = await getDataTeamService();
        const proposals = await getProposalService();
        const labels = category.map((category) => category.categoriName);
        const categoryCount = category.map((categori) => categori._count.teamCategory)
        return res.status(200).json({
            category: {
                labels: labels,
                data: categoryCount || 0
            },
            totalTeam: teams.length,
            totalTeamPending: teams.filter((team) => team.verified === false).length,
            proposalsVerified: proposals.filter((proposal) => proposal.status === "approve").length,
            proposalsRejected: proposals.filter((proposal) => proposal.status === "rejected").length,
            proposalsPending: proposals.filter((proposal) => proposal.status === "pending").length,
            recentTeams,
            totalProposal: proposals.length
        });
    } catch (error) {

    }
}