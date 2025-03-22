import { db } from "../config/database"
import { AppError } from "../utils/AppError";

export const getAllDataCategory = async () => {
    const categori = await db.category.findMany({ orderBy: { id: "desc" }, include: { _count: true } });
    return categori;
}

export const updateCategoryService = async (id: number, categoriName: string, description: string, deadline: Date) => {
    const existsCategory = await db.category.findUnique({ where: { id: id } });
    if (!existsCategory) throw new AppError("Category not found", 404);
    const updatedCategory = await db.category.update({ data: { categoriName: categoriName, description: description, deadline: deadline }, where: { id } });
    if (!updatedCategory) throw new AppError("Failed update category", 400);
    return updateCategoryService;
}

export const deleteCategoryService = async (id: number) => {
    const existsCategory = await db.category.findUnique({ where: { id: id } });
    if (!existsCategory) throw new AppError("Category not found", 404);
    const deletedCategory = await db.category.delete({ where: { id: id } });
    return deletedCategory;
}

export const addCategoriService = async (categoriName: string, description: string, deadline: Date) => {
    const newCategory = await db.category.create({
        data: { categoriName: categoriName, description: description, deadline: deadline }
    });
    if (!newCategory) throw new AppError("Fail saved category.", 400);
    return newCategory
}

export const findCategory = async (id: number) => {
    const category = await db.category.findUnique({
        where: { id }, select: { deadline: true }
    });
    return category
}