import bycrpt from "bcryptjs"

export const hashPassword = async (password: string) => {
    const salt = await bycrpt.genSalt(10);
    return bycrpt.hash(password, salt);
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bycrpt.compare(password, hashedPassword)
}