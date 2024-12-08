import { RoleUser } from "@prisma/client";
import { db } from "../config/database"
import { AppError } from "../utils/AppError";
import { sendEmailVerfikasi } from "./AuthService";

export const GetAllUser = async () => {
    const users = await db.user.findMany({ orderBy: { name: "asc" } });
    return users;
}

export const GetByID = async (id: string) => {
    // mencari data user berdasarkan id
    const user = await db.user.findUnique({ where: { id }, include: { teamMember: { include: { team: true } } } });
    // jika data user tidak tidak ditemukan maka lempar error
    if (!user) throw new AppError("User not found", 404);
    // jika data user ditemukan kembalikan data user
    return user;
}

export const CheckEmailExist = async (email: string) => {
    const user = await db.user.findUnique({
        where: { email: String(email) }
    });

    return user ? true : false;
}

export const Delete = async (id: string) => {
    // cari user berdasarkan id
    const user = await db.user.findUnique({ where: { id: String(id) } });
    // jika user tidak ditemukan lempar error
    if (!user) throw new AppError("User not found", 404);
    // jika ada hapus user
    await db.user.delete({ where: { id } });
    return user;
}

export const CheckEmailExistIgnoreId = async (email: string, id: string) => {
    const emailExist = await db.user.findFirst({ where: { email: email, NOT: { id: id } } });
    if (emailExist) return true;
}

export const editUSer = async (id: string, email: string, password: string | null, name: string, role: RoleUser) => {
    // mencari user berdasarkan email, jika email sudah tersedia lempar error
    const userExists = await db.user.findUnique({ where: { email: email, NOT: { id: id } } });
    if (userExists) throw new AppError("Email already exists", 400);

    const user = await db.user.findUnique({ where: { id: id } });
    // mencari user berdasarkan email, jika user tidak ada lempar error
    if (!user) throw new AppError("User not found", 404);

    const lastPassword = user.password
    let userUpdate = {}
    if (password !== null) {
        // update data user
        userUpdate = await db.user.update({
            data: { email, password, name, role }, where: { id }
        });
    } else {
        // update data user
        userUpdate = await db.user.update({
            data: { email, password: lastPassword, name, role }, where: { id }
        });
    }

    // jika user gagal diupdate maka lempar error
    if (!userUpdate) throw new AppError("failed update data user", 400);
    return userUpdate;
}

export const addUserService = async (email: string, password: string, name: string, role: RoleUser) => {
    const user = await db.user.findUnique({ where: { email: email } });
    if (user) throw new AppError("Email already exists", 400);
    // menambahkan data user ke database
    const newUser = await db.user.create({ data: { email, password, name, role } });
    await sendEmailVerfikasi(newUser, password);
    // jika gagal menambahan data lempar error
    if (!newUser) throw new AppError("Failed add new user", 400);
    // jika tidak ada error kembalikan data user yang baru dicreate
    return newUser;
}