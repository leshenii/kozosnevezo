import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
            status: 405,
        });
    }

    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('projectId');

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(projectId)
            },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return new Response(JSON.stringify(project), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching project from database:', error);
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

    const { id, participants, ...data } = await request.json();

    try {
        const updatedProject = await prisma.project.update({
            where: { id: parseInt(id) },
            data,
        });

        if (participants) {
            await prisma.projectParticipant.deleteMany({
                where: { projectId: parseInt(id) }
            });

            await prisma.projectParticipant.createMany({
                data: participants.map(participant => ({
                    projectId: parseInt(id),
                    userId: participant.id
                }))
            });
        }

        return new Response(JSON.stringify(updatedProject), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error updating project in database:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}