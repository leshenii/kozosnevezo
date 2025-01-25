import {Providers} from "@/app/components/Providers";
import Navbar_ from "@/app/components/Navbar_";
import {ClerkProvider} from "@clerk/nextjs";
import { huHU } from '@clerk/localizations'
import "./globals.css";


export const metadata = {
    title: "Közös Nevező Egyesület",
    description: "Erasmus+ projektek, pályázatok, együttműködések",
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider localization={huHU}>
            <html lang="en">
            <body
                className="kozos-nevezo text-foreground bg-background"
            >
            <header className="w-full">
                <Navbar_/>
            </header>
            <Providers>
                {children}
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
