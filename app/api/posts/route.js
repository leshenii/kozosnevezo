import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    try {
        const newsPosts = await prisma.newsPost.findMany()
        const socialPosts = await prisma.socialPost.findMany()

        const mergedPosts = [...newsPosts, ...socialPosts];
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
