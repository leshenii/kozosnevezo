'use client'

import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";
import { MailIconMobile, MailIconDesktop, InstagramIconMobile, InstagramIconDesktop } from "../lib/icons";

export default function FloatingButton() {

    const router = useRouter()

    return (
        <>
            <div className="fab-center flex flex-row justify-end sm:hidden pr-4 gap-3">
                <MailIconMobile/>
                <InstagramIconMobile/>
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
                <MailIconDesktop/>
                <InstagramIconDesktop/>
            </div>


        </>
    );
}