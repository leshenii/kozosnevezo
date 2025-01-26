'use client'

import {useEffect, useState} from "react";
import {Button, Spinner} from "@heroui/react";
import {Skeleton} from "@heroui/skeleton";

export default function NewsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [urls, setUrls] = useState([])

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

    return (
        <>
            <div className='flex flex-row items-center w-full px-6'>
                <div className="w-2/6"></div>
                <h1 className="m-5 title w-2/6 text-center">Hírek</h1>
                <div className="w-1/6"></div>
                <div className="w-1/6 text-right">
                    <Button color="primary" radius="full" variant="solid"
                            onPress={() => router.push('/sign-in')}>
                        <p className='kanit-semibold text-large'>Új hírt írok</p>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 w-11/12 gap-4 mb-4">
                {isLoading ? (
                    <>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                        <Skeleton className="">
                            <div className="h-[350px] w-[100%] rounded-lg bg-default-300"/>
                        </Skeleton>
                    </>
                ) : (
                    urls.map((post, index) => (
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
        </>
    )
        ;
}