import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadDrive = multer({ storage })