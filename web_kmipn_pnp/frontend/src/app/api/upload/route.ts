import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        // Cek apakah file valid
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
        }

        // Konversi Blob ke ArrayBuffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Tentukan path penyimpanan
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);

        // Simpan file ke folder
        await writeFile(filePath, buffer);

        return NextResponse.json({ message: 'Upload successful!', path: `/uploads/${file.name}` });
    } catch (error: any) {
        return NextResponse.json({ error: 'Upload failed.', details: error.message }, { status: 500 });
    }
}
