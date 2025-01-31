'use client'

import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import {SignedOut, SignedIn, UserButton} from "@clerk/nextjs";
import {useRouter} from 'next/navigation';
import {useAuth} from "@clerk/nextjs";
import {motion} from "motion/react"
import {Logo} from "../lib/logo";

export default function Navbar_() {

    const router = useRouter()
    const {isLoaded, userId} = useAuth()

    return (
        <Navbar maxWidth="full" shouldHideOnScroll className="!h-[110px] sm:!h-[64px] pb-6 sm:py-3 bg-opacity-100">
            <NavbarBrand className="hidden sm:flex">
                <Logo/>
                <motion.div
                    whileHover={{scale: 1.08}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => router.push('/')}
                >
                    <p style={{cursor: 'pointer'}}
                       className='kanit-bold text-3xl pl-2'>KÖZÖS NEVEZŐ</p>
                </motion.div>
            </NavbarBrand>
            <div className="flex flex-col gap-3 h-full w-full sm:gap-0 sm:h-auto sm:w-auto">
                <NavbarContent justify="center" className="sm:hidden">
                    <Logo/>
                    <motion.div
                        whileHover={{scale: 1.08}}
                        whileTap={{scale: 0.9, borderRadius: "100%"}}
                        onClick={() => router.push('/')}
                    >
                        <p style={{cursor: 'pointer'}}
                           className='kanit-bold text-3xl pl-2'>KÖZÖS NEVEZŐ</p>
                    </motion.div>
                </NavbarContent>
                <NavbarContent justify="center" className="gap-8" >
                    <NavbarItem>
                        <motion.div
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.8, borderRadius: "100%"}}
                            onClick={() => router.push('/news')}
                        >
                        <span className="kanit-semibold text-2xl" style={{cursor: 'pointer'}}>
                            Hírek
                        </span>
                        </motion.div>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <motion.div
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.8, borderRadius: "100%"}}
                            onClick={() => router.push('/projects')}
                        >
                        <span className="kanit-semibold text-2xl" style={{cursor: 'pointer'}}>
                            Projektek
                        </span>
                        </motion.div>
                    </NavbarItem>
                    {(isLoaded && userId) && (
                        <NavbarItem>
                            <motion.div
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.8, borderRadius: "100%"}}
                                onClick={() => router.push('/profile')}
                            >
                        <span className="kanit-semibold text-2xl" style={{cursor: 'pointer'}}>
                            Profilom
                        </span>
                            </motion.div>
                        </NavbarItem>
                    )}
                </NavbarContent>
            </div>
            <NavbarContent justify="end" className="hidden sm:flex">
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