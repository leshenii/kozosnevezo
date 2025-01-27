import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, res) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const { url, date } = await request.json();

    const updatedUrl = url.replace('autoplay=1', 'autoplay=0') + '&mute=1';

    console.log(url, updatedUrl, date)

    try {
        const database_url = await prisma.url.create({
            data: {
                url: updatedUrl,
                date
            },
        });

        return new Response('Event created successfully.', {
            status: 200,
        });
    } catch (error) {
        console.error('Error in IFTTT webhook:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(request) {
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    try {
        const urls = await prisma.url.findMany({
            orderBy: [
                { date: 'desc' },
                { id: 'desc' }
            ]
        });
        return Response.json(urls);
    } catch (error) {
        console.error('Error fetching URLs from database:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}