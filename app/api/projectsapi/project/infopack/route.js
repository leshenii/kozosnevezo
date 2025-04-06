import {deleteInfopack, downloadFile} from "../../../../components/UploadFile";
import { parse } from 'url';
import { handleUpload } from '@vercel/blob/client';
import { head } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');
    const blobDetails = await head(blobUrl, {token: process.env.BLOB_READ_WRITE_TOKEN});

    return Response.json(blobDetails);
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

export async function POST(request) {
    const body = await request.json();

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.

                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                        // you could pass a user id from auth, or a value from clientPayload
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full upload flow

                console.log('blob upload completed', blob, tokenPayload);

                try {
                    // Run any logic after the file upload completed
                    // const { userId } = JSON.parse(tokenPayload);
                    // await db.update({ avatar: blob.url, userId });
                } catch (error) {
                    throw new Error('Could not update user');
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error instanceof Error ? error.message : 'Unknown error') },
            { status: 400 } // The webhook will retry 5 times waiting for a status 200
        );
    }
}