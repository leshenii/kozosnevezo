const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const tiktokPosts = [
    {
        url: 'https://www.tiktok.com/player/v1/7247449028600843546?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T10:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247451440002764059?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T12:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247453912914021658?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T15:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247530249095859483?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T17:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247570708589464859?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T20:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7247616295040978203?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-22T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7248981021700394267?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-06-26T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7277631902851419424?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-09-11T20:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7277632463340440864?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2023-09-11T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7329542059474324769?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-01-29T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7358065120649514272?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-04-15T20:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7358071356832910625?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-04-15T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7385462601486060832?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-06-28T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7409749489579265312?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-01T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411093132923751712?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-05T08:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411487182562528544?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-06T12:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411488035050687777?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-06T16:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7411505458902617376?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-06T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7414930456941956385?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-09-15T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7428341116304461089?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-10-21T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7428731249935551776?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-10-23T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7431559919335214358?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-10-30T23:59:59+02:00"
    },
    {
        url: 'https://www.tiktok.com/player/v1/7431911536685255958?music_info=1&description=1&autoplay=0&mute=1&loop=1&utm_campaign=tt4d_open_api&utm_source=awa6z07qoicg5jkx',
        date: "2024-10-31T23:59:59+02:00"
    },
]

const instagramPosts = [
    {
        url: 'https://www.instagram.com/p/CrQ14R3I4gd/embed',
        date: "2023-06-04T10:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Cral1Zko6je/embed',
        date: "2023-06-04T10:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CriFUkOIpKw/embed',
        date: "2023-06-04T10:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CsbZKPoonPi/embed',
        date: "2023-06-22T10:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CtC3uNloQT_/embed',
        date: "2023-06-22T15:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Ctyh8pwsBfr/embed',
        date: "2023-06-22T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CtzS0eQxECh/embed',
        date: "2023-06-24T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CtzaoRDMbHH/embed',
        date: "2023-06-26T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Ct3uPOpMz6C/embed',
        date: "2023-07-19T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Ct9K8Srs1Ju/embed',
        date: "2023-07-20T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Cu4Ubfvs7mv/embed',
        date: "2023-07-21T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Cu7Gy7wM_Ln/embed',
        date: "2023-09-12T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Cu9__nxsYIb/embed',
        date: "2023-09-12T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxFX_gxMVQF/embed',
        date: "2023-09-13T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxFwizHs5qc/embed',
        date: "2023-09-19T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxIxO1EMlo7/embed',
        date: "2023-09-20T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxYtHUEM0OK/embed',
        date: "2023-09-24T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxbRuhdsruj/embed',
        date: "2023-09-28T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxlIIdisaHn/embed',
        date: "2023-10-09T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CxvF7iTMiOs/embed',
        date: "2023-10-14T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CyLbdlsMnhr/embed',
        date: "2023-11-14T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/CyY68bjMtvl/embed',
        date: "2023-11-21T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/Czo_E9ts7Nm/embed',
        date: "2023-11-25T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/GsMLMG/embed',
        date: "2023-11-25T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C0EO8oyMuyI/embed',
        date: "2023-12-08T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C0lw5aYMusy/embed',
        date: "2023-12-09T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C0ot49bsr6F/embed',
        date: "2023-12-27T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C1XfgUhNuit/embed',
        date: "2023-12-27T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C2ug6OXtrxd/embed',
        date: "2024-01-30T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C3DaGBwN1Jx/embed',
        date: "2024-02-07T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C5jLizvNbtx/embed',
        date: "2024-04-09T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C5jMBNBtwsF/embed',
        date: "2024-04-15T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C5yGNMgNVB7/embed',
        date: "2024-04-16T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C5y0NtoNAmd/embed',
        date: "2024-04-16T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C53CNustqDG/embed',
        date: "2024-04-17T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C7MiiDAtxVL/embed',
        date: "2024-05-20T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C7bTkOXtCcz/embed',
        date: "2024-05-26T16:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C7bUZnaNIVK/embed',
        date: "2024-05-26T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C8NdHQwt745/embed',
        date: "2024-06-14T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C8p4FIsNkl_/embed',
        date: "2024-06-25T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C8p8GsFtpDb/embed',
        date: "2024-06-26T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C8uc56Qt6nx/embed',
        date: "2024-06-27T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C8wPxVoNIA3/embed',
        date: "2024-06-28T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C9KO_RviTPc/embed',
        date: "2024-07-08T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_iHdQENaTb/embed',
        date: "2024-09-05T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_kdplvtzvU/embed',
        date: "2024-09-06T20:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_k2Y-lNs3Z/embed',
        date: "2024-09-06T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_p0bjANAGe/embed',
        date: "2024-09-08T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_vZY10NBaj/embed',
        date: "2024-09-10T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_1e2clNnmk/embed',
        date: "2024-09-13T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/C_8JtfAtz51/embed',
        date: "2024-09-15T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DA5tU9WtWOE/embed',
        date: "2024-10-09T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DBHAbyZtZuj/embed',
        date: "2024-10-14T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DBWKCsRNLef/embed',
        date: "2024-10-20T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DBa-NlVIdqb/embed',
        date: "2024-10-22T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DBdaP7HOsVp/embed',
        date: "2024-10-23T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DBv5MgxIGSM/embed',
        date: "2024-10-30T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DB4K_3bNKX5/embed',
        date: "2024-11-02T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DCWvrFWNUfw/embed',
        date: "2024-11-14T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DCZ1HB3Reo_/embed',
        date: "2024-11-15T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DCi-bARO4Hm/embed',
        date: "2024-11-19T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DD60HP3Nj8f/embed',
        date: "2024-12-23T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DEIsPYZxnLo/embed',
        date: "2024-12-28T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DFAAX1ONG_6/embed',
        date: "2025-01-19T23:59:59+02:00"
    },
    {
        url: 'https://www.instagram.com/p/DGOjq1Lxjtt/embed',
        date: "2025-02-18T23:59:59+02:00"
    }
];

const sitePosts = [
    {
        title: "Felállt a Közös Nevező Egyesület saját weboldala!",
        content: `Lorem ipsum odor amet, consectetuer adipiscing elit. Etiam facilisis ullamcorper semper; maecenas facilisis viverra. Tempus nunc nulla class tincidunt suscipit parturient mollis. Nullam vestibulum enim nostra enim cubilia lacus malesuada. Aliquet sociosqu bibendum tristique rutrum integer. Maecenas tristique pulvinar magnis blandit mi arcu aenean suspendisse. Sapien per parturient, molestie suscipit curabitur erat dictumst. Magna est dui sociosqu facilisi himenaeos morbi habitasse. Hendrerit efficitur elementum pretium dis montes habitasse elit.

Elit eget est orci at diam conubia. Magnis fermentum orci tellus magna ac nullam taciti feugiat. Vehicula aenean ligula aptent nunc laoreet. Sollicitudin varius pharetra mus mi mi, elit aenean. Fusce curabitur per vestibulum potenti vehicula aenean elementum sem. Velit himenaeos hendrerit varius senectus mauris class? Habitasse hendrerit gravida tellus, consectetur mattis posuere. Cras risus vivamus duis hac ac semper porta. Taciti ligula aliquet consectetur malesuada integer eu elementum quisque.`,
        date: new Date(),
    },
    {
        title: "Teszt közlemény",
        content: `Lorem ipsum odor amet, consectetuer adipiscing elit. Etiam facilisis ullamcorper semper; maecenas facilisis viverra. Tempus nunc nulla class tincidunt suscipit parturient mollis. Nullam vestibulum enim nostra enim cubilia lacus malesuada. Aliquet sociosqu bibendum tristique rutrum integer. Maecenas tristique pulvinar magnis blandit mi arcu aenean suspendisse. Sapien per parturient, molestie suscipit curabitur erat dictumst. Magna est dui sociosqu facilisi himenaeos morbi habitasse. Hendrerit efficitur elementum pretium dis montes habitasse elit.

Elit eget est orci at diam conubia. Magnis fermentum orci tellus magna ac nullam taciti feugiat. Vehicula aenean ligula aptent nunc laoreet. Sollicitudin varius pharetra mus mi mi, elit aenean. Fusce curabitur per vestibulum potenti vehicula aenean elementum sem. Velit himenaeos hendrerit varius senectus mauris class? Habitasse hendrerit gravida tellus, consectetur mattis posuere. Cras risus vivamus duis hac ac semper porta. Taciti ligula aliquet consectetur malesuada integer eu elementum quisque.`,
        date: new Date('2024-04-10T18:30:41'),
    }
]


const projects = [
    {
        type: "Youth Exchange",
        title: "Yes for Cyber, No for Bullying",
        country: "Olaszország",
        location: "Agrigento",
        startDate: new Date('2024-10-16T00:00:00Z'),
        endDate: new Date('2024-10-24T00:00:00Z')
    },
    {
        type: "Youth Exchange",
        title: "Artistic Bridges: Theatre",
        country: "Olaszország",
        location: "Agrigento",
        startDate: new Date('2024-10-01T00:00:00Z'),
        endDate: new Date('2024-10-10T00:00:00Z')
    },
    {
        type: "Youth Exchange",
        title: "Soft Skill Academy",
        country: "Magyarország",
        location: "Nyíregyháza",
        startDate: new Date('2024-11-03T00:00:00Z'),
        endDate: new Date('2024-11-12T00:00:00Z')
    },
    {
        type: "Youth Exchange",
        title: "Culture, food, health",
        country: "Lengyelország",
        location: "Swarozyn",
        startDate: new Date('2025-02-14T00:00:00Z'),
        endDate: new Date('2025-02-23T00:00:00Z')
    },
    {
        type: "Youth Exchange",
        title: "Become a Young Leader",
        country: "Lengyelország",
        location: "Rusocin",
        startDate: new Date('2024-08-22T00:00:00Z'),
        endDate: new Date('2024-08-30T00:00:00Z'),
        organization: "Gyermek-Mosoly Egyesület"
    },
    {
        type: "Youth Exchange",
        title: "StartUp Spark",
        country: "Spanyolország",
        location: "Málaga",
        startDate: new Date('2024-03-07T00:00:00Z'),
        endDate: new Date('2024-03-14T00:00:00Z'),
        organization: "Asociación EuroMuévete"
    },
    {
        type: "Advanced Planning Visit",
        title: "Networking generates oppurtunities",
        country: "Lengyelország",
        location: "Starogard Gdanski",
        startDate: new Date('2023-12-09T00:00:00Z'),
        endDate: new Date('2023-12-09T00:00:00Z'),
        organization: "Beniaminek03 Association"
    },
    {
        type: "Youth Exchange",
        title: "Dance Around the World",
        country: "Magyarország",
        location: "Nyíregyháza",
        startDate: new Date('2023-10-31T00:00:00Z'),
        endDate: new Date('2023-11-08T00:00:00Z'),
        organization: "Gyermek-Mosoly Egyesület"
    },
    {
        type: "Training Course",
        title: "Smoke in The Forest",
        country: "Spanyolország",
        location: "Puente Genil",
        startDate: new Date('2023-08-23T00:00:00Z'),
        endDate: new Date('2023-08-30T00:00:00Z'),
    },

]

async function seed() {

    const instagramPostsArray = await prisma.socialPost.createMany({
        data: instagramPosts.map(post => ({...post})),
    })

    const tiktokPostsArray = await prisma.socialPost.createMany({
        data: tiktokPosts.map(post => ({...post})),
    })

    const sitePostsArray = await prisma.sitePost.createMany({
        data: sitePosts.map(post => ({...post})),
    })

    const projectsArray = await prisma.project.createMany({
        data: projects.map(project => ({...project})),
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
