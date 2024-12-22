import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { checkTokenResetService, forgotPasswordService, loginService, registerService, resendEmailVerifikasiService, resetPasswordService, verifyTokenService } from "../services/AuthService";
import { decodeJWT, generateToken, refreshTokenJwt, userLogin, verifyToken } from "../config/jwt";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import { db } from "../config/database";
import { hashPassword } from "../utils/HashPassword";

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

export const resendEmailVerifikasi = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Validation required", statusCode: 400, errors });
        const { email } = req.body;
        const resendEmail = await resendEmailVerifikasiService(email);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mengirim email verifikasi."
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

export const forgotPassword = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, msg: "Validation required", statusCode: 400, errors });

        const { email } = req.body;
        const resetService = await forgotPasswordService(email);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Link reset password telah dikirim ke email Anda!",
            data: resetService
        })

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

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400)
                .json(
                    {
                        success: false, msg: "Password min 8 character, must contain at least one lowercase letter, one uppercase letter, one number letter, one symbol.",
                        statusCode: 400
                    });
        const { password, userId } = req.body;
        const hashedPassword = await hashPassword(password);
        const reset = await resetPasswordService(hashedPassword, userId);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "password berhasil dirubah.",
            data: reset
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


export const checkTokenReset = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { token } = req.params;
        const check = await checkTokenResetService(token);
        res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Token valid.",
            data: check
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