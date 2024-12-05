import { Request, Response } from "express";
import { getAllDataCategory } from "../services/CategoriService"

export const getInfoDashboardAdmin = async (req: Request, res: Response) => {
    try {
        const category = await getAllDataCategory();
        const labels = category.map((category) => category.categoriName);
        const categoryCount = category.map((categori, index) => categori._count.teamCategory)
        return res.status(200).json({
            category: {
                labels: labels,
                data: categoryCount || 0
            }
        })
    } catch (error) {

    }
}