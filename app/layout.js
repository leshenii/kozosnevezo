import {Providers} from "@/app/components/Providers";
import Navbar_ from "@/app/components/Navbar_";
import {ClerkProvider} from "@clerk/nextjs";
import { huHU } from '@clerk/localizations'
import "./globals.css";
import { registerLicense } from '@syncfusion/ej2-base';

export const metadata = {
    title: "Közös Nevező Egyesület",
    description: "Erasmus+ projektek, pályázatok, együttműködések",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
};

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhLYVJ2WmFZfVtgd19FZ1ZRQWYuP1ZhSXxWdkdjWn9dc3NVQ2dZUkU=');

export default function RootLayout({children}) {

    return (
        <ClerkProvider localization={huHU}>
            <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico"/>
            </head>
            <body
                className="kozos-nevezo kanit-regular text-foreground bg-background h-auto min-h-screen"
            >
            <Navbar_/>
            <Providers>
                {children}
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
