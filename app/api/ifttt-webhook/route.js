import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, res) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const { tiktokUrl } = await request.json();

    try {
        const url = await prisma.url.create({
            data: {
                tiktokUrl
            },
        });

        return new Response('Event created successfully.', {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching graph data:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

