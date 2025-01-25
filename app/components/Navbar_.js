'use client'

import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import Link from "next/link";
import {SignedOut, SignedIn, UserButton} from "@clerk/nextjs";
import { Inter } from 'next/font/google'
import {useRouter} from 'next/navigation';
import {useAuth} from "@clerk/nextjs";

const inter = Inter({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

export default function Navbar_() {

    const router = useRouter()
    const {isLoaded, userId} = useAuth()

    return (
            <Navbar maxWidth="full" height="50px" shouldHideOnScroll className="bg-primary" >
                <NavbarBrand>
                    <p className={`${inter.className} text-white`}>KÖZÖS NEVEZŐ</p>
                </NavbarBrand>
                <NavbarContent className="text-white gap-4" justify="center">
                    <NavbarItem>
                        <Link href="/news">
                            Hírek
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="/projects">
                            Projektek
                        </Link>
                    </NavbarItem>
                    {(isLoaded && userId) && (
                        <NavbarItem>
                            <Link color="foreground" href="/profile">
                                Profilom
                            </Link>
                        </NavbarItem>
                    )}
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <SignedOut>
                            <Button color="secondary" radius="full" variant="solid" onPress={() => router.push('/sign-in')}>
                                <p className={inter.className}>Bejelentkezés</p>
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
    )
}