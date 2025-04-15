"use client"

import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {useRouter} from "next/navigation";
import {motion} from "motion/react"
import {AiFillInstagram, AiFillTikTok} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import {FaCopyright} from "react-icons/fa";
import {RiMailFill} from "react-icons/ri";

export default function Footer() {

    const router = useRouter()

    const items = [{
        key: "Alapszabaly.pdf", label: "Alapszabály",
    }, {
        key: "adatkezelesi_tajekoztato.pdf", label: "Adatkezelési tájékoztató (.pdf)",
    }, {
        key: "privacy-policy", label: "Adatkezelési tájékoztató (.html)",
    }, {
        key: "felhasznalasi_feltetelek.pdf", label: "Felhasználási feltételek",
    }, {
        key: "felhasznaloi_adatok_torlesenek_utmutatoja.pdf", label: "Felhasználói adatok törlésének útmutatója",
    }, {
        key: "Beszamolo_2013.pdf", label: "Beszámoló 2013",
    }, {
        key: "Beszamolo_2014.pdf", label: "Beszámoló 2014",
    }, {
        key: "Beszamolo_2015.pdf", label: "Beszámoló 2015",
    }, {
        key: "Beszamolo_2016.pdf", label: "Beszámoló 2016",
    }, {
        key: "Beszamolo_2017.pdf", label: "Beszámoló 2017",
    }, {
        key: "Beszamolo_2018.pdf", label: "Beszámoló 2018",
    }, {
        key: "Beszamolo_2019.pdf", label: "Beszámoló 2019",
    }, {
        key: "Beszamolo_2020.pdf", label: "Beszámoló 2020",
    }, {
        key: "Beszamolo_2021.pdf", label: "Beszámoló 2021",
    }, {
        key: "Beszamolo_2022.pdf", label: "Beszámoló 2022",
    }, {
        key: "Beszamolo_2023.pdf", label: "Beszámoló 2023",
    },];


    return (
        <footer className="w-full items-center justify-center h-[70px] sm:h-[40px] ">
        <div className="flex flex-col gap-2 sm:hidden">
            <div className="flex flex-row justify-center items-center gap-2">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                >
                    <AiFillInstagram size="35px" className="fill-blue-900"/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.tiktok.com/@saly_hun', '_blank')}
                >
                    <AiFillTikTok size="35px" className="fill-blue-900"/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('mailto:kozosnevezo@outlook.com', '_blank')}
                    className="cursor-pointer"
                >
                    <RiMailFill size="35px" className="fill-blue-900"/>
                </motion.div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="solid" radius="full" size="sm" color="primary"><p className='kanit-semibold text-sm'>Dokumentumok</p></Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (<DropdownItem
                            key={item.key}
                            color="primary"
                            onPress={() => window.open(`/${item.key}`, '_blank')}
                        >
                            {item.label}
                        </DropdownItem>)}
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
            <div className="flex flex-row w-full gap-2 items-center justify-center text-gray-500 text-sm">
                <FaCopyright/>
                <p className="leading-4">
                    2025 Közös Nevező Egyesület – Minden jog fenntartva.
                </p>
            </div>
        </div>
        <div className="flex-row hidden sm:flex justify-center items-center pr-4 gap-3">
            <div className="w-1/3"></div>
            <div className="flex flex-row gap-2 items-center justify-center w-1/3">
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.instagram.com/saly_hun/', '_blank')}
                    className="cursor-pointer"
                >
                    <AiFillInstagram size="35px" className="fill-blue-900"/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('https://www.tiktok.com/@saly_hun', '_blank')}
                    className="cursor-pointer"
                >
                    <AiFillTikTok size="35px" className="fill-blue-900"/>
                </motion.div>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9, borderRadius: "100%"}}
                    onClick={() => window.open('mailto:kozosnevezo@outlook.com', '_blank')}
                    className="cursor-pointer"
                >
                    <RiMailFill size="35px" className="fill-blue-900"/>
                </motion.div>

                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="solid" radius="full" size="sm" color="primary">Dokumentumok</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (<DropdownItem
                            key={item.key}
                            color="primary"
                            onPress={() => window.open(`/${item.key}`, '_blank')}
                        >
                            {item.label}
                        </DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="flex flex-row w-1/3 gap-2 items-center justify-end text-gray-500 text-sm">
                <FaCopyright/>
                <p className="leading-4">
                    2025 Közös Nevező Egyesület – Minden jog fenntartva.
                </p>
            </div>

        </div>
    </footer>
    )
}