'use client'

import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import Link from "next/link";
import {SignedOut, SignedIn, UserButton} from "@clerk/nextjs";
import {useRouter} from 'next/navigation';
import {useAuth} from "@clerk/nextjs";
import { motion } from "motion/react"

export const Logo = () => (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 551.69 582.44">
        <path
            d="M50.62,582.44s0-26,1.21-30.17c3.69-35.76,6.83-71.62,8.05-107.52.81-23.69,2.58-43.64-5.51-66.53-8.69-24.58-26.75-44.95-32.32-71.07-6.66-31.31-6.57-70.9-.65-102.3C37.56,119.09,98.84,69.98,168.07,57.92c7.8-1.35,15.71-2.24,23.66-2.65,52.81-2.76,107.75,15.27,149.22,54.29,2.25,2.13,4.47,4.31,6.64,6.56,12.37,12.78,23.37,27.57,32.53,44.38,15.53,28.49,33.99,80.31,23.7,111.97-2.6,7.99-10.11,18.4-8.85,26.57.55,3.59,3.32,6.37,5.44,9.24,11.83,15.99,25.54,30.68,37.24,46.8,5.08,9.29,1.82,21.27-5.95,27.98-7.88,6.82-23.25,6.95-33.33,9.36-.76.18-1.36.15-1.65,1.06-.12.37-.99,15.53-2.02,33.75-1.55,27.53-3.45,62.06-3.66,63.23-.24,1.32-.52,2.59-.86,3.8-1.47,5.28-3.85,9.58-6.92,13.08-8.28,9.42-21.59,12.91-35.52,13.69-.08,0-.15,0-.22,0-1.41.06-2.82.11-4.23.14-1.56.03-3.12.03-4.68,0-1.38-.03-2.75-.08-4.13-.14h-.1c-.07,0-.15,0-.22,0-3.06-.15-6.08-.37-9.01-.65-4.25-.39-8.33-.88-12.08-1.37-15.21-1.99-30.05-5.86-45.12-8.58l-1.19,41.84-.8,27.87"
            fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="34"/>
        <path
            d="M145.22,544.44s0-26,1.21-30.17c3.69-35.76,6.83-71.62,8.05-107.52.81-23.69,2.58-43.64-5.51-66.53-8.69-24.58-26.75-44.95-32.32-71.07-6.66-31.31-6.57-70.9-.65-102.3C132.16,81.09,193.44,31.98,262.67,19.92c7.8-1.35,15.71-2.24,23.66-2.65,52.81-2.76,107.75,15.27,149.22,54.29,2.25,2.13,4.47,4.31,6.64,6.56,12.37,12.78,23.37,27.57,32.53,44.38,15.53,28.49,33.99,80.31,23.7,111.97-2.6,7.99-10.11,18.4-8.85,26.57.55,3.59,3.32,6.37,5.44,9.24,11.83,15.99,25.54,30.68,37.24,46.8,5.08,9.29,1.82,21.27-5.95,27.98-7.88,6.82-23.25,6.95-33.33,9.36-.76.18-1.36.15-1.65,1.06-.12.37-.99,15.53-2.02,33.75-1.55,27.53-3.45,62.06-3.66,63.23-.24,1.32-.52,2.59-.86,3.8-1.47,5.28-3.85,9.58-6.92,13.08-8.28,9.42-21.59,12.91-35.52,13.69-.08,0-.15,0-.22,0-1.41.06-2.82.11-4.23.14-1.56.03-3.12.03-4.68,0-1.38-.03-2.75-.08-4.13-.14h-.1c-.07,0-.15,0-.22,0-3.06-.15-6.08-.37-9.01-.65-4.25-.39-8.33-.88-12.08-1.37"
            fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="34"/>
        <g>
            <line x1="278.12" y1="65.54" x2="260.31" y2="74.66" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="249.11" y1="80.39" x2="131.52" y2="140.57" fill="none" stroke="#000"
                  strokeDasharray="33.55 12.58" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="125.92" y1="143.43" x2="108.12" y2="152.54" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="320.12" y1="101.54" x2="302.32" y2="110.67" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="288.87" y1="117.57" x2="147.64" y2="189.97" fill="none" stroke="#000"
                  strokeDasharray="40.31 15.12" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="140.91" y1="193.42" x2="123.12" y2="202.54" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="357.12" y1="139.54" x2="339.34" y2="148.7" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="326.87" y1="155.12" x2="150.26" y2="246.09" fill="none" stroke="#000"
                  strokeDasharray="37.39 14.02" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="144.03" y1="249.3" x2="126.25" y2="258.46" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="380.81" y1="185.03" x2="363.03" y2="194.19" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="350.57" y1="200.61" x2="173.96" y2="291.58" fill="none" stroke="#000"
                  strokeDasharray="37.39 14.02" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="167.73" y1="294.79" x2="149.95" y2="303.95" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="392.67" y1="236.99" x2="374.89" y2="246.15" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="362.42" y1="252.57" x2="185.82" y2="343.54" fill="none" stroke="#000"
                  strokeDasharray="37.39 14.02" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="179.58" y1="346.75" x2="161.8" y2="355.9" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="395.67" y1="292.45" x2="377.89" y2="301.6" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="365.43" y1="308.03" x2="188.82" y2="398.99" fill="none" stroke="#000"
                  strokeDasharray="37.39 14.02" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="182.59" y1="402.2" x2="164.81" y2="411.36" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="415.12" y1="340.54" x2="397.34" y2="349.72" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="383.71" y1="356.75" x2="190.55" y2="456.43" fill="none" stroke="#000"
                  strokeDasharray="40.92 15.34" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="183.73" y1="459.95" x2="165.96" y2="469.12" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="405.12" y1="402.17" x2="387.35" y2="411.34" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="373.71" y1="418.38" x2="180.55" y2="518.06" fill="none" stroke="#000"
                  strokeDasharray="40.92 15.34" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="173.73" y1="521.58" x2="155.96" y2="530.75" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
        <g>
            <line x1="395.12" y1="464.54" x2="377.36" y2="473.75" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
            <line x1="365.18" y1="480.06" x2="281.96" y2="523.19" fill="none" stroke="#000"
                  strokeDasharray="36.58 13.72" strokeLinejoin="round" strokeWidth="17"/>
            <line x1="275.87" y1="526.34" x2="258.12" y2="535.54" fill="none" stroke="#000" strokeLinejoin="round"
                  strokeWidth="17"/>
        </g>
    </svg>
)

export default function Navbar_() {

    const router = useRouter()
    const {isLoaded, userId} = useAuth()

    return (
        <Navbar maxWidth="full" height="50px" shouldHideOnScroll className="py-3 bg-opacity-100">
            <NavbarBrand>
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
            <NavbarContent justify="center" className="gap-8">
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
                                <UserButton />
                            </SignedIn>
                        </>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}