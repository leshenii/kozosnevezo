'use client'

import {NumberTicker} from "./components/NumberTicker";
import {useEffect, useState} from "react";
import {Spinner} from "@heroui/react";

export default function Home() {

    const [numberOfProjects, setNumberOfProjects] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const fetchProjects = async () => {
        await fetch('/api/projectsapi', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(projects => {
                setNumberOfProjects(projects.length)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching projects:', error)
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchProjects()
    }, []);

    return (
        <div className="flex flex-col items-center border-red-600 justify-center pb-[110px] sm:pb-[0px] h-screen-minus-navbar mx-3 text-center">
            <span className="kanit-semibold text-4xl sm:text-6xl">Már nem kevesebb, mint</span>
            { isLoading ?
                <Spinner color="primary" size="lg" className="py-7"/>
                :
            <NumberTicker
                value={numberOfProjects}
                className="text-6xl sm:text-8xl kanit-bold"
            />}
            <span className="kanit-semibold text-4xl sm:text-6xl">projekten vettünk részt.</span>
        </div>
    )
}
