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
    {
        url: 'https://www.tiktok.com/player/v1/7247616295040978203?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7248981021700394267?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7277631902851419424?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7277632463340440864?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7329542059474324769?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7358065120649514272?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7358071356832910625?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7385462601486060832?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7409749489579265312?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411093132923751712?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411487182562528544?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411488035050687777?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411505458902617376?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7414930456941956385?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7428341116304461089?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7428731249935551776?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7431559919335214358?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
    {
        url: 'https://www.tiktok.com/player/v1/7431911536685255958?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: null
    },
]

const instagramPosts = [
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CVXw6K7I9Y_/',
        date: null
    }
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
