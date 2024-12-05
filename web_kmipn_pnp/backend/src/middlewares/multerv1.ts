import express, { Request, Response } from 'express';
import multer from 'multer';

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Menamai file dengan timestamp
    }
});

const upload = multer({
    storage: storage,
}).array('foto_ktm', 3); // Mengharapkan sampai 3 file dengan nama field 'foto_ktm'

// Endpoint untuk menangani upload
const app = express();
app.post('/upload', upload, (req: Request, res: Response) => {
    console.log(req.files); // Menampilkan array file yang diupload
    res.json({
        message: 'Files uploaded successfully',
        files: req.files, // Akan berisi array file yang diupload
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
