import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    try {
        const projects = await prisma.project.findMany()

        return new Response(JSON.stringify(projects), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching projects from database:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    try {
        const { userId, projectId } = await request.json();

        if (!userId || !projectId) {
            return new Response('Bad Request: Missing userId or projectId', {
                status: 400,
            });
        }

        const newParticipant = await prisma.projectParticipant.create({
            data: {
                userId: parseInt(userId),
                projectId: parseInt(projectId),
            },
        });

        return new Response(JSON.stringify(newParticipant), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding user to project:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}