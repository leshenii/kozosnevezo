"use server";
import { revalidatePath } from "next/cache";
import * as ftp from "basic-ftp";
import { Readable, Writable } from "stream";

export async function uploadFile(formData) {
    let lastFile = null;
    for (const [name, value] of formData.entries()) {
        if (name === "file") {
            lastFile = value;
        }
    }
    const file = lastFile;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });

        const readableStream = new Readable();
        readableStream._read = () => {};
        readableStream.push(buffer);
        readableStream.push(null);

        await client.uploadFrom(readableStream, `/infopacks/${file.name}`);
        console.log(`File uploaded successfully to /infopacks/${file.name}`);
    } catch (error) {
        console.error("Error uploading file:", error);
    } finally {
        client.close();
    }

    revalidatePath("/");
}

export async function downloadFile(fileName) {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });

        const writableStream = new Writable({
            write(chunk, encoding, callback) {
                // Handle the chunk of data here
                console.log(chunk.toString());
                callback();
            }
        });

        await client.downloadTo(writableStream, `/infopacks/${fileName}`);
        console.log(`File downloaded successfully from /infopacks/${fileName}`);

        return writableStream;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    } finally {
        client.close();
    }
}

export async function deleteInfopack(fileName) {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });

        await client.remove(`/infopacks/${fileName}`);
        console.log(`File deleted successfully from /infopacks/${fileName}`);
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    } finally {
        client.close();
    }
}