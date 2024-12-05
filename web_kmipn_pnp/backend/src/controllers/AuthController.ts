import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { loginService, registerService, verifyTokenService } from "../services/AuthService";
import { decodeJWT, generateToken, refreshTokenJwt, userLogin, verifyToken } from "../config/jwt";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, msg: "validation required", statusCode: 400, errors: errors.array() });
        }
        const { email, name, password } = req.body;
        const user = await registerService(email, password, name);
        const accessToken = generateToken(user);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 60 * 1000
        });
        return res.status(201).json({ success: true, statusCode: 201, msg: "User registered successfully, check your email for verify your email.", data: user })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message,
                errors: error.message
            });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" });
    }
}

export const verifyEmail = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { token } = req.query
        const cektoken = await verifyTokenService(String(token));
        // if (!cektoken) throw new AppError("Something went wrong", 400);
        return res.status(200).json({ success: true, statusCode: 200, msg: "Email verified successfully" });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" });[]
    }
}


export const login = async (req: Request, res: Response<ResponseApi>) => {
    console.log(req.body);

    const existsAccessToken = req.cookies.accessToken;
    if (existsAccessToken) { return res.status(400).json({ success: false, statusCode: 400, msg: "You already login." }) }
    const { email, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Validation require", errors: errors.array() });
        }

        const userValid = await loginService(email, password);
        const accessToken = generateToken(userValid);

        const decode = decodeJWT(accessToken);
        if (decode.user.role === 'participant') {
            decode.user.teamMember ? res.cookie("teamDataCompleate", true, { httpOnly: true, secure: true, sameSite: "strict" }) :
                res.cookie("teamDataCompleate", false, { httpOnly: true, secure: true, sameSite: "strict" })
        }

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true, statusCode: 200, msg: "Successfully logged in", data: {
                user: userValid,
                accessToken: accessToken,
                teamDataCompleate: userValid.teamMember ? true : false
            }
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            });
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error " + error
        });
    }
}

export const refreshToken = (req: Request, res: Response<ResponseApi>) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh token not found", 400);
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
        const newAccessToken = refreshTokenJwt(refreshToken);

        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (error: any, data: any) => {
            return res.status(200).json({
                success: true,
                statusCode: 200,
                msg: "Successfully refresh token",
                data: {
                    accessToken: newAccessToken
                }
            });
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            })
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error" + error
        })
    }
}

export const logout = (req: Request, res: Response<ResponseApi>) => {
    res.clearCookie('refreshToken'); // Hapus refresh token dari cookie
    res.clearCookie('accessToken'); // Hapus access token dari cookie
    res.status(200).json({ success: true, statusCode: 200, msg: 'Logged out successfully' });
};