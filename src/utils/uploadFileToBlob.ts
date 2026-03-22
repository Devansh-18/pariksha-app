import { upload } from "@vercel/blob/client";

export async function uploadPdf(file: File) {
    const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
    });
    return newBlob.url;
}