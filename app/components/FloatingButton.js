'use client'

import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {useRouter} from "next/navigation";
import { MailIconMobile, MailIconDesktop, InstagramIconMobile, InstagramIconDesktop } from "../lib/icons";
import {motion} from "motion/react"

export default function FloatingButton() {

    const router = useRouter()

    const items = [
        {
            key: "Alapszabaly.pdf",
            label: "Alapszabály",
        },
        {
            key: "Beszámoló_2013.pdf",
            label: "Beszámoló 2013",
        },
        {
            key: "Beszámoló_2014.pdf",
            label: "Beszámoló 2014",
        },
        {
            key: "Beszámoló_2015.pdf",
            label: "Beszámoló 2015",
        },
        {
            key: "Beszámoló_2016.pdf",
            label: "Beszámoló 2016",
        },
        {
            key: "Beszámoló_2017.pdf",
            label: "Beszámoló 2017",
        },
        {
            key: "Beszámoló_2018.pdf",
            label: "Beszámoló 2018",
        },
        {
            key: "Beszámoló_2019.pdf",
            label: "Beszámoló 2019",
        },
        {
            key: "Beszámoló_2020.pdf",
            label: "Beszámoló 2020",
        },
        {
            key: "Beszámoló_2021.pdf",
            label: "Beszámoló 2021",
        },
        {
            key: "Beszámoló_2022.pdf",
            label: "Beszámoló 2022",
        },
    ];

    return (
        <>
            <div className="fab-center flex flex-row justify-center sm:hidden gap-2">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="ghost" radius="full" size="md" color="primary">Beszámolók</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color="primary"
                                onPress={  () => window.open(`/${item.key}`, '_blank')}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
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
                    <Button size="md" color="primary" radius="full" variant="solid"
                            onPress={() => router.push('/sign-in')} className=" sm:hidden">
                        <p className='kanit-semibold text-large'>Bejelentkezés</p>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
            <div className="fab-center flex-row hidden sm:flex justify-center items-center pr-4 gap-3">
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
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="ghost" radius="full" size="sm" color="primary">Beszámolók</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color="primary"
                                onPress={  () => window.open(`/${item.key}`, '_blank')}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>


            </div>


        </>
    );
}