import { db } from "../config/database"

export const findToken = async (token: string) => {
    console.log("find token" + token);

    const userToken = await db.userToken.findUnique({
        where: { token: token },
        include: { user: true }
    });

    return userToken;
}