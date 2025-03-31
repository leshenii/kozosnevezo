import {deleteInfopack, downloadFile} from "../../../../components/UploadFile";
import { parse } from 'url';

export async function GET(req, res) {
    const { query } = parse(req.url, true);
    const { fileName } = query;

    try {
        const fileBuffer = await downloadFile(fileName);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(fileBuffer);
    } catch (error) {
        console.error("Error downloading file:", error);
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}

export async function DELETE(req, res) {
    const { query } = parse(req.url, true);
    const { fileName } = query;

    try {
        await deleteInfopack(fileName);
        console.error('File deleted successfully:', fileName);
        return new Response('File deleted successfully', {
            status: 200
        })
    } catch (error) {
        console.error("Error deleting file:", error);
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}