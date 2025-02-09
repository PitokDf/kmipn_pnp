import { NextFunction, Request, Response } from "express";
import { decodeJWT, verifyToken } from "../config/jwt";

export const authenticateJWT = (req: any | Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken ?? (req.headers?.authorization! && req.headers?.authorization!.split(" ")[1]) ?? null;
    if (!accessToken) {
        return res.status(401).json({ message: "Token is required." });
    }

    const decodeToken = decodeJWT(accessToken);

    if (!decodeToken) {
        return res.status(401).json({ message: "Invalid token format." }); // Token gagal didecode
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expireToken = decodeToken.exp;

    if (!expireToken || currentTime > expireToken) {
        res.clearCookie("accessToken");
        return res.status(401).json({ message: "Your session expired, please login again." });
    }

    try {
        const decode = verifyToken(accessToken);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};
