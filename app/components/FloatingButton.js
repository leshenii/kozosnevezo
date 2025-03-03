'use client'

import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";
import { MailIconMobile, MailIconDesktop, InstagramIconMobile, InstagramIconDesktop } from "../lib/icons";
import {motion} from "motion/react"

export default function FloatingButton() {

    const router = useRouter()

    return (
        <>
            <div className="fab-center flex flex-row justify-end sm:hidden pr-4 gap-3">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                >
                    <InstagramIconMobile/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                >
                    <MailIconMobile/>
                </motion.div>
                <SignedOut>
                    <Button size="lg" color="primary" radius="full" variant="solid"
                            onPress={() => router.push('/sign-in')} className=" sm:hidden">
                        <p className='kanit-semibold text-large'>Bejelentkezés</p>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
            <div className="fab-center flex-row hidden sm:flex justify-center pr-4 gap-3">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                    className="cursor-pointer"
                >
                    <InstagramIconDesktop/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                    className="cursor-pointer"
                >
                    <MailIconDesktop/>
                </motion.div>


            </div>


        </>
    );
}