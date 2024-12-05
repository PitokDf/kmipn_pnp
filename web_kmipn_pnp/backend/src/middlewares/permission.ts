import { NextFunction, Request, Response } from "express"

export const isParticipant = (req: any, res: Response, next: NextFunction) => {
    const user = req.user.user;
    if (user.role !== "participant") return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Can only participant access."
    });
    next();
}

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
    const user = req.user.user;
    if (user.role !== "admin") return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Can only admin access."
    });
    next();
}

export const isJuri = (req: any, res: Response, next: NextFunction) => {
    const user = req.user.user;
    if (user.role !== "juri") return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Can only juri access."
    });
    next();
}