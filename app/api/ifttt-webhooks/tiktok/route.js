import { PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(request, res) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const { url, date } = await request.json();

    const updatedUrl = url.replace('autoplay=1', 'autoplay=0') + '&mute=1';
    const parsedDate = parse(date, 'MMMM d, yyyy \'at\' hh:mma', new Date());
    const formattedDate = parsedDate.toISOString();

    try {
        const database_socialpost = await prisma.socialPost.create({
            data: {
                url: updatedUrl,
                date: formattedDate
            },
        });

        return new Response('Event created successfully.', {
            status: 200,
        });
    } catch (error) {
        console.error('Error in IFTTT tiktok webhook:', error);
        return new Response(JSON.stringify({
            message: 'Internal Server Error',
            error: error.message,
            url,
            updatedUrl,
            date,
            formattedDate
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await prisma.$disconnect();
    }
}
