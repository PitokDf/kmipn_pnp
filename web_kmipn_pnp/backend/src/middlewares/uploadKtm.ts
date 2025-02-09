import { Request, Response, NextFunction } from "express";
import { uploadFile } from "./mutlerUploadFile";

// Middleware untuk menangani upload dengan multiple fields
export const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const membersCount = req.body.members ? req.body.members.length : 0;

    const fields: { name: string; maxCount: number }[] = [];

    for (let i = 0; i < membersCount; i++) {
        fields.push({ name: `members[${i}][foto_ktm]`, maxCount: 1 });
    }

    uploadFile.fields(fields)(req, res, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        next();
    });
};
