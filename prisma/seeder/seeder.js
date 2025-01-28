const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const tiktokPosts = [
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
        url: 'https://www.instagram.com/p/CrQ14R3I4gd/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Cral1Zko6je/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CriFUkOIpKw/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CsbZKPoonPi/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CtC3uNloQT_/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Ctyh8pwsBfr/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CtzS0eQxECh/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CtzaoRDMbHH/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Ct3uPOpMz6C/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Ct9K8Srs1Ju/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Cu4Ubfvs7mv/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Cu7Gy7wM_Ln/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Cu9__nxsYIb/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxFX_gxMVQF/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxFwizHs5qc/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxIxO1EMlo7/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxYtHUEM0OK/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxbRuhdsruj/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxlIIdisaHn/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CxvF7iTMiOs/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CyLbdlsMnhr/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/CyY68bjMtvl/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/Czo_E9ts7Nm/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/GsMLMG/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C0EO8oyMuyI/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C0lw5aYMusy/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C0ot49bsr6F/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C1XfgUhNuit/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C2ug6OXtrxd/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C3DaGBwN1Jx/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C5jLizvNbtx/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C5jMBNBtwsF/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C5yGNMgNVB7/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C5y0NtoNAmd/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C53CNustqDG/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C7MiiDAtxVL/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C7bTkOXtCcz/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C7bUZnaNIVK/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C8NdHQwt745/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C8p4FIsNkl_/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C8p8GsFtpDb/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C8uc56Qt6nx/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C8wPxVoNIA3/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C9KO_RviTPc/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_iHdQENaTb/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_kdplvtzvU/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_k2Y-lNs3Z/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_p0bjANAGe/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_vZY10NBaj/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_1e2clNnmk/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/C_8JtfAtz51/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DA5tU9WtWOE/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DBHAbyZtZuj/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DBWKCsRNLef/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DBa-NlVIdqb/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DBdaP7HOsVp/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DBv5MgxIGSM/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DB4K_3bNKX5/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DCWvrFWNUfw/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DCZ1HB3Reo_/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DCi-bARO4Hm/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DD60HP3Nj8f/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DEIsPYZxnLo/embed',
        date: null
    },
    {
        url: 'https://www.instagram.com/p/DFAAX1ONG_6/embed',
        date: null
    },
]

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
