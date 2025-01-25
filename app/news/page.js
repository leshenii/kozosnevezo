'use client'

import dynamic from 'next/dynamic';

const InstagramEmbed = dynamic(
    () => import('react-social-media-embed').then(mod => mod.InstagramEmbed),
    { ssr: false }
);

export default function NewsPage() {
    return (
        <div>
            <h1>News</h1>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <InstagramEmbed url="https://www.instagram.com/p/DFAAX1ONG_6/?img_index=1" width={328} captioned/>
            </div>
        </div>
    );
}