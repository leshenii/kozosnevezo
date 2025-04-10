"use client"

import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {useRouter} from "next/navigation";
import {motion} from "motion/react"
import {AiFillInstagram, AiFillTikTok} from "react-icons/ai";
import {MdEmail} from "react-icons/md";

export default function Footer() {

    const router = useRouter()

    const items = [
        {
            key: "Alapszabaly.pdf",
            label: "Alapszabály",
        },
        {
            key: "adatkezelesi_tajekoztato.pdf",
            label: "Adatkezelési tájékoztató",
        },
        {
            key: "felhasznalasi_feltetelek.pdf",
            label: "Felhasználási feltételek",
        },
        {
            key: "felhasznaloi_adatok_torlesenek_utmutatoja.pdf",
            label: "Felhasználói adatok törlésének útmutatója",
        },
        {
            key: "Beszamolo_2013.pdf",
            label: "Beszámoló 2013",
        },
        {
            key: "Beszamolo_2014.pdf",
            label: "Beszámoló 2014",
        },
        {
            key: "Beszamolo_2015.pdf",
            label: "Beszámoló 2015",
        },
        {
            key: "Beszamolo_2016.pdf",
            label: "Beszámoló 2016",
        },
        {
            key: "Beszamolo_2017.pdf",
            label: "Beszámoló 2017",
        },
        {
            key: "Beszamolo_2018.pdf",
            label: "Beszámoló 2018",
        },
        {
            key: "Beszamolo_2019.pdf",
            label: "Beszámoló 2019",
        },
        {
            key: "Beszamolo_2020.pdf",
            label: "Beszámoló 2020",
        },
        {
            key: "Beszamolo_2021.pdf",
            label: "Beszámoló 2021",
        },
        {
            key: "Beszamolo_2022.pdf",
            label: "Beszámoló 2022",
        },
        {
            key: "Beszamolo_2023.pdf",
            label: "Beszámoló 2023",
        },
    ];


    return (
        <footer className="w-full items-center justify-center h-[40px] ">
            <div className="flex flex-row justify-center items-center sm:hidden gap-2">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                >
                    <AiFillInstagram  size="35px" className="fill-blue-900" />
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.tiktok.com/@saly_hun', '_blank')}
                >
                    <AiFillTikTok size="35px" className="fill-blue-900" />
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('mailto:kozosnevezo@outlook.com', '_blank')}
                    className="cursor-pointer"
                >
                    <MdEmail size="35px" className="fill-blue-900" />
                </motion.div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="solid" radius="full" size="sm" color="primary">Dokumentumok</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color="primary"
                                onPress={() => window.open(`/${item.key}`, '_blank')}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>

                <SignedOut>
                    <Button size="sm" color="primary" radius="full" variant="solid"
                            onPress={() => router.push('/sign-in')} className=" sm:hidden">
                        <p className='kanit-semibold text-sm'>Bejelentkezés</p>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            avatarBox: 'w-[34px] h-[34px]',
                        },
                    }}/>
                </SignedIn>
            </div>
            <div className="flex-row hidden sm:flex justify-center items-center pr-4 gap-3">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                    className="cursor-pointer"
                >
                    <AiFillInstagram  size="35px" className="fill-blue-900" />
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.tiktok.com/@saly_hun', '_blank')}
                    className="cursor-pointer"
                >
                    <AiFillTikTok size="35px" className="fill-blue-900" />
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('mailto:kozosnevezo@outlook.com', '_blank')}
                    className="cursor-pointer"
                >
                    <MdEmail size="35px" className="fill-blue-900" />
                </motion.div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="solid" radius="full" size="sm" color="primary">Dokumentumok</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color="primary"
                                onPress={() => window.open(`/${item.key}`, '_blank')}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>


            </div>
        </footer>
    )
}