import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from "crypto";
import { User } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { Request } from 'express';
import { GetByID } from '../services/UserService';

const JWT_SECRET = process.env.JWT_SECRET || "123456";
const ENCRYPTION_KEY = process.env.JWT_SECRET || "pitokganteng121203";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "pitokganteng121203";

export const generateToken = (user: User) => {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" })
    return token;
}

export const generateRefreshToken = (user: User) => {
    const refreshToken = jwt.sign({ user }, JWT_REFRESH_SECRET, { expiresIn: "1d" });
    return refreshToken;
}

export const refreshTokenJwt = (refreshToken: string) => {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, data: any) => {
        if (err) throw new AppError("Invalid refresh token", 401);
        return generateToken(data.user);
    });
}

export const verifyToken = (encryptedToken: string) => {
    try {
        // Verifikasi token JWT
        return jwt.verify(encryptedToken, JWT_SECRET, (err, decode) => {
            if (err) throw new AppError("Invalid token", 401);
            return decode;
        });
    } catch (error: any) {
        throw new Error('Token verification failed: ' + error.message);
    }
}

const encrypToken = (token: string) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-ccm', ENCRYPTION_KEY, iv, {
        authTagLength: 16
    });
    let encryted = cipher.update(token, 'utf8', 'hex');
    encryted += cipher.final('hex');
    return iv.toString('hex') + ':' + encryted + ":" + cipher.getAuthTag().toString('hex');
}

const decryptToken = (encryptedToken: string) => {
    try {
        const [ivHex, encryptedText, authTagHex] = encryptedToken.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');

        const decipher = crypto.createDecipheriv('aes-256-ccm', ENCRYPTION_KEY, iv, {
            authTagLength: 16
        });
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error: any) {
        throw new Error('Failed to decrypt token: ' + error.message);
    }
}

type userType = {
    name: string;
    id: string;
    email: string;
    password: string;
    verified: boolean;
    teamMembers: []
}

export const userLogin = async (req: Request) => {
    const token = req.cookies.accessToken ?? (req.headers?.authorization! && req.headers?.authorization!.split(" ")[1]) ?? null;
    const decode = decodeJWT(token);
    const user = await GetByID(decode.user.id);
    return user;
}

export const decodeJWT = (token: string) => {
    const decode = jwt.decode(token);
    return decode as JwtPayload;
}