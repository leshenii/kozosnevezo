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

export async function PUT(request) {
    if (request.method !== 'PUT') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const data = await request.json();

    try {
        const createdProject = await prisma.project.create({
            data,
        });

        return new Response(JSON.stringify(createdProject), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error creating project:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}