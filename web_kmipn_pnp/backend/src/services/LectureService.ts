import { db } from "../config/database"
import { AppError } from "../utils/AppError"

export const createDosenService = async (name: string, nip: string) => {
    const lecture = await db.lecture.create({
        data: {
            name: name, nip: nip
        }
    })

    if (!lecture) throw new AppError("Failded created lecture", 400);
    return lecture;
}