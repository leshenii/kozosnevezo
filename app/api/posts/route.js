import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    try {
        const sitePosts = await prisma.sitePost.findMany()
        const socialPosts = await prisma.socialPost.findMany()

        const mergedPosts = [...sitePosts, ...socialPosts];
        const sortedPosts = mergedPosts.sort((a, b) => {
            if (!a.date && !b.date) {
                return b.id - a.id;
            }
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
            return new Date(b.date) - new Date(a.date);
        });

        return new Response(JSON.stringify(sortedPosts), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching URLs from database:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(request, res) {
    if (request.method !== 'PUT') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const { title, content } = await request.json();

    try {
        const sitePost = await prisma.sitePost.create({
            data: {
                title,
                content,
                date: new Date(),
            },
        });

        return new Response('Event created successfully.', {
            status: 200,
        });
    } catch (error) {
        console.error('Error creating site post:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}
