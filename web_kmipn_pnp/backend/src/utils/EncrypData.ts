import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Harus 32 byte
const iv = crypto.randomBytes(16);

export const encrypt = (data: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}