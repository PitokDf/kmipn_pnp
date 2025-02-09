import { db } from "../config/database"

export const getAllSubmissionService = async () => {
    const submission = await db.submission.findMany({ orderBy: { createdAt: "desc" }, include: { team: true } })
    return submission;
}