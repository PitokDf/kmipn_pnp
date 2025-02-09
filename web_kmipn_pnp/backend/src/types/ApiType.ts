import { $Enums } from "@prisma/client";

export interface ResponseApi {
    success: boolean,
    statusCode: number,
    msg: string,
    data?: any,
    errors?: any
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: $Enums.RoleUser;
}