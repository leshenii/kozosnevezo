import {PrismaClient} from '@prisma/client';
import {headers} from 'next/headers'
import {Webhook} from 'svix'

const prisma = new PrismaClient();

export async function POST(request, res) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const SIGNING_SECRET = process.env.SIGNING_SECRET
    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }
    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Error: Could not verify webhook:', err);
        return new Response('Error: Verification error', {
            status: 400,
        });
    }

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
        const {id, email_addresses} = evt.data;
        const email = email_addresses[0].email_address;

        try {
            await prisma.user.upsert({
                where: {email},
                update: {clerkId: id},
                create: {email, clerkId: id},
            });

            return new Response('User created or updated successfully.', {
                status: 200,
            });
        } catch (error) {
            console.error('Error creating or updating user:', error);
            return new Response('Internal Server Error', {
                status: 500,
            });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return new Response('Event not supported', {
            status: 400,
        });
    }
}

