'use client'

import {useEffect, useRef, useState} from "react";
import {Button} from "@heroui/react";
import {Skeleton} from "@heroui/skeleton";

export default function NewsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [urls, setUrls] = useState([])
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);

    const fetchUrls = async () => {
        await fetch('/api/ifttt-webhook', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(urls => {
                setUrls(urls);
                setIsLoading(false)
                console.log(urls);
            })
            .catch(error => console.error('Error fetching urls:', error));
    }

    useEffect(() => {
        fetchUrls();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisibleCount((prevCount) => prevCount + 12);
            }
        }, { threshold: 1.0 });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className='flex flex-row items-center w-full px-6'>
                <div className="w-2/6"></div>
                <h1 className="m-5 title w-2/6 text-center">Hírek</h1>
                <div className="w-1/6"></div>
                <div className="w-1/6 text-right">
                    <Button color="primary" radius="full" variant="ghost"
                            onPress={() => router.push('/sign-in')}>
                        <p className='kanit-semibold text-large'>Új hírt közlök</p>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 w-11/12 gap-4 mb-4">
                {isLoading ? (
                    <>
                        {[...Array(12)].map((_, index) => (
                            <Skeleton key={index} className="">
                                <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                            </Skeleton>
                        ))}
                    </>
                ) : (
                    urls.slice(0, visibleCount).map((post, index) => (
                        <div key={index}>
                            <iframe
                                width="100%"
                                height="350"
                                src={post.url}
                            />
                        </div>
                    ))
                )}
            </div>
            <div ref={loaderRef} className="h-10"></div>
        </>
    )
        ;
}