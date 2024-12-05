import { db } from "../config/database"
import { AppError } from "../utils/AppError";
import { comparePassword, hashPassword } from "../utils/HashPassword";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendEmail } from "../utils/NodeMailer";
import { Delete } from "./UserService";
import path from "path";
import { readHtmlFile } from "../utils/readHtmlFile";
import { replacePlaceholders } from "../utils/replacePlaceholder";
import { findToken } from "./UserTokenService";
import { User } from "@prisma/client";

dotenv.config();

export const registerService = async (email: string, password: string, name: string) => {
    // cek email sudah tersedia atau belum
    const existingUser = await db.user.findUnique({
        where: { email }
    });

    // jika email sudah tersedia lepar error
    if (existingUser) throw new AppError("User already exists", 400);

    // enkripsi password untuk disimpan ke databases
    const hashedPassword = await hashPassword(password);

    // membuat user baru
    const newUser = await db.user.create({ data: { name, email, password: hashedPassword } });

    await sendEmailVerfikasi(newUser, password)
    // kembalikan data user
    return newUser;
}

export const verifyTokenService = async (token: string) => {
    const usertToken = await findToken(token);
    // melakukan pengecekan apakah tokan valid
    if (!usertToken) throw new AppError("Invalid or expired token", 400);
    // melakukan pengecekan apakah token sudah expire atau belum
    if (usertToken.expiresAt < new Date()) throw new AppError("Token expired", 400);
    // update kolom verified jadi true
    await db.user.update({
        where: { id: usertToken.userId },
        data: { verified: true }
    });
    // hapus token dari table user token setelah proses berhasil
    await db.userToken.delete({ where: { id: usertToken.id } });
    return true;
}

export const sendEmailVerfikasi = async (user: User, password?: string) => {
    // membuat verifikasi token dengan dependency crypto
    const verivicationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiryDate = new Date(); // set token expire
    tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 1)

    // membuat token untuk user
    await db.userToken.create({ data: { token: verivicationToken, userId: user.id, expiresAt: tokenExpiryDate } });

    // mengirim email verifikasi ke user
    const filePath = path.join(__dirname, '../templates/VerivicationEmail.html')
    let emailContent = await readHtmlFile(filePath);
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verivicationToken}`;
    const placeholders = {
        "{{ verificationLink }}": verificationLink,
        "{{ type_of_action }}": "Verify email",
        "{{ name }}": user.name,
        "{{ email }}": user.email,
        "{{ password }}": password ?? ""
    };
    emailContent = replacePlaceholders(emailContent, placeholders)
    const sendEmailSuccess = await sendEmail(user.email, "Verify email", emailContent);

    // jika email verifikasi gagal terkirim maka lempar error dan hapus user
    if (!sendEmailSuccess) {
        Delete(user.id);
        throw new AppError("Periksa koneksi internetmu!", 400);
    }
}

export const loginService = async (email: string, password: string) => {
    const user = await db.user.findUnique({ where: { email }, include: { teamMember: true } });
    if (!user) throw new AppError("Pengguna belum terdaftar.", 404);
    // cek apakah email sudah di verifikasi
    if (!user?.verified) throw new AppError("Please verify your email.", 400);
    // cek apakah user tersedia dan password tersedia
    if (!user || !(await comparePassword(password, user.password))) throw new AppError("Invalid credential", 400);
    return user;
}