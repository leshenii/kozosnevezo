const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const posts = [
    {
        url: 'https://www.tiktok.com/player/v1/7247449028600843546?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247451440002764059?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247453912914021658?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247530249095859483?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247570708589464859?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
]

async function seed() {
    const post = await prisma.url.createMany({
        data: posts.map(post => ({...post})),
    })

    console.log('Seed data inserted successfully');
}

// Run the seed function
seed()
    .catch((error) => {
        console.error('Error seeding database:', error);
    })
    .finally(async () => {
        // Disconnect PrismaClient
        await prisma.$disconnect();
    });
