import { google } from "googleapis";
import { Readable } from "node:stream";

const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "";
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || ""

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY
    },
    scopes: ["https://www.googleapis.com/auth/drive"]
})

const drive = google.drive({ version: "v3", auth })

async function setFilePermissions(fileId: string) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
    } catch (error) {
        throw error
    }
}

export async function uploadFileToDrive(fileBuffer: Buffer, fileName: string, mimeType: string, folderId: string) {
    try {
        console.info(`uploading file '${fileName}' to drive`);

        const fileMetadata = {
            name: fileName,
            parents: [folderId]
        }

        const bufferStream = new Readable()
        bufferStream.push(fileBuffer)
        bufferStream.push(null)

        const media = {
            mimeType,
            body: bufferStream
        }

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media,
            fields: 'id, webViewLink, webContentLink'
        })

        await setFilePermissions(response.data.id!)
        console.info(`successfully upload file '${fileName}' to drive`);
        console.log(response.data.id);

        return response.data
    } catch (error) {
        console.info(`uploading file '${fileName}' to drive, failed`);
        console.log(error);

        throw error
    }
}

export async function deleteFileFromDrive(fileId: string) {
    try {
        await drive.files.delete({ fileId })
    } catch (error) {
        throw error
    }
}