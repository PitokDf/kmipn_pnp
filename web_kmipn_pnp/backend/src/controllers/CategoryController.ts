import { Request, Response } from "express";
import { addCategoriService, deleteCategoryService, getAllDataCategory, updateCategoryService } from "../services/CategoriService";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { validationResult } from "express-validator";

export const getAllCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        const sendData = async () => {
            const categori = await getAllDataCategory();
            return res.write(`data: ${JSON.stringify({ success: true, data: categori })}\n\n`)
        };

        const intervalId = setInterval(sendData, 5000)

        req.on('close', () => { clearInterval(intervalId); res.end(); })
    } catch (error) {
        res.write(`data: ${JSON.stringify({ success: false, msg: "Internal server error" })}\n\n`);
        res.end();
    }
}
export const getAllCategoryClose = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const categori = await getAllDataCategory();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Successfully get data",
            data: categori
        })
    } catch (error) {
        res.write(`data: ${JSON.stringify({ success: false, msg: "Internal server error" })}\n\n`);
        res.end();
    }
}

export const updateCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({
            success: false, statusCode: 400, msg: "Internal server error", errors: errors.array()
        });

        const { id } = req.params
        const { categoriName, description, deadline } = req.body
        const updatedCategory = await updateCategoryService(Number(id), categoriName, description, deadline);
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully update category", data: updatedCategory })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false, statusCode: error.statusCode, msg: error.message, errors: error.message
            })
        }

        return res.status(500).json({
            success: false, statusCode: 500, msg: "Internal server error", errors: error
        })
    }
}

export const createCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Successfully added category", errors: errors.array() })
        }
        const { categoriName, description, deadline } = req.body;
        const convertDeadline = new Date(deadline);
        const newCategory = await addCategoriService(categoriName, description, convertDeadline);
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully added category", data: newCategory })
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message,
                errors: error
            })
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error.",
            errors: error.message
        })
    }
}

export const deleteCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategoryService(Number(id));
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Successfully delete category",
            data: deletedCategory
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message,
                errors: error
            })
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error."
        })
    }
}