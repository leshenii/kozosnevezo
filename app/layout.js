import {Providers} from "app/components/Providers";
import Navbar_ from "@/app/components/Navbar_";
import {ClerkProvider} from "@clerk/nextjs";
import {huHU} from '@clerk/localizations'
import "./globals.css";
import {registerLicense} from '@syncfusion/ej2-base';
import {Button} from "@heroui/react";
import FloatingButton from "@/app/components/FloatingButton";
import Footer from "./components/Footer";

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
            <html lang="en" className="bg-[#F2F2F2]">
            <head>
                <link rel="icon" href="/favicon.ico"/>
            </head>
            <body
                className="kozos-nevezo kanit-regular text-foreground min-h-screen"
            >


            <Providers>
                <Navbar_/>
                {children}
                {/* <FloatingButton/> */}
                <Footer/>
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
