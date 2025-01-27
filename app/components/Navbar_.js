'use client'

import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import Link from "next/link";
import {SignedOut, SignedIn, UserButton} from "@clerk/nextjs";
import {Inter} from 'next/font/google'
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
        <Navbar maxWidth="full" height="50px" shouldHideOnScroll className="py-3 bg-opacity-100">
            <NavbarBrand>
                <p className='kanit-bold text-3xl'>KÖZÖS NEVEZŐ</p>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Link href="/news" className="kanit-semibold text-2xl">
                        Hírek
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/projects" className="kanit-semibold text-2xl">
                        Projektek
                    </Link>
                </NavbarItem>
                {(isLoaded && userId) && (
                    <NavbarItem>
                        <Link href="/profile" className="kanit-semibold text-2xl">
                            Profilom
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {!isLoaded ? (
                        <Button size="lg" color="primary" radius="full" variant="solid" isDisabled>
                            <p className='kanit-semibold text-large'>Bejelentkezés</p>
                        </Button>
                    ) : (
                        <>
                            <SignedOut>
                                <Button size="lg" color="primary" radius="full" variant="solid"
                                        onPress={() => router.push('/sign-in')}>
                                    <p className='kanit-semibold text-large'>Bejelentkezés</p>
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <UserButton/>
                            </SignedIn>
                        </>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}