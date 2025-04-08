import { handleUpload } from '@vercel/blob/client';
import { head, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');
    const blobDetails = await head(blobUrl, {token: process.env.BLOB_READ_WRITE_TOKEN});

    return Response.json(blobDetails);
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');

    if (!blobUrl) {
        return new Response('Blob URL is required', { status: 400 });
    }

    try {
        // Check if the blob exists
        const blobDetails = await head(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
        if (!blobDetails) {
            return new Response('Blob not found', { status: 404 });
        }

        // Delete the blob
        await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
        return new Response('Blob deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting blob:', error);
        return new Response('Internal Server Error', { status: 500 });
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