import { PrismaClient } from '@prisma/client';
import {parse} from "date-fns";

const prisma = new PrismaClient();

export async function POST(request, res) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const { url, date } = await request.json();

    const updatedUrl = url.replace('instagr.am', 'www.instagram.com') + 'embed';
    const parsedDate = parse(date, 'MMMM d, yyyy \'at\' hh:mma', new Date());
    const formattedDate = parsedDate.toISOString();

    try {
        const database_url = await prisma.url.create({
            data: {
                url: updatedUrl,
                date: formattedDate
            },
        });

        return new Response('Event created successfully.', {
            status: 200,
        });
    } catch (error) {
        console.error('Error in IFTTT instagram photo webhook:', error);
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