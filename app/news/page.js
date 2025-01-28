'use client'

import {useEffect, useRef, useState} from "react";
import {Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup} from "@heroui/react";
import {Skeleton} from "@heroui/skeleton";

export default function NewsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);
    const [selected, setSelected] = useState(["tiktok", "instagram", "kozlemenyek"]);
    const [isInvalid, setIsInvalid] = useState(false);

    const fetchPosts = async () => {
        await fetch('/api/posts', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(postsLocale => {
                setPosts(postsLocale)
                setIsLoading(false)
            })
            .catch(error => console.error('Error fetching urls:', error));
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log(posts)
    }, [posts]);

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


    const filteredUrls = posts.filter(post => {
        if (selected.includes('tiktok') && post.url?.includes('www.tiktok.com')) {
            return true;
        }
        if (selected.includes('instagram') && post.url?.includes('www.instagram.com')) {
            return true;
        }
        return selected.includes('kozlemenyek') && post.title;
    });

    return (
        <>
            <div className='flex flex-row items-center w-full px-6'>
                <div className="w-2/6">
                    <CheckboxGroup
                        color="primary"
                        defaultValue={["tiktok", "instagram", "kozlemenyek"]}
                        label="Jelöld be, milyen híreket szeretnél látni!"
                        value={selected}
                        isInvalid={isInvalid}
                        onValueChange={(value) => {
                            setIsInvalid(value.length < 1);
                            setSelected(value);
                            setVisibleCount(12);
                        }}
                        orientation="horizontal"
                    >
                        <Checkbox className="mr-1" value="tiktok">TikTok</Checkbox>
                        <Checkbox className="mr-1" value="instagram">Instagram</Checkbox>
                        <Checkbox value="kozlemenyek">Közlemények</Checkbox>
                    </CheckboxGroup>
                </div>
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
                                <div className="h-[450px] w-[100%] rounded-lg bg-default-300"/>
                            </Skeleton>
                        ))}
                    </>
                ) : (
                    filteredUrls.slice(0, visibleCount).map((post, index) => (
                        <div key={index}>
                            {post.url ? (
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={post.url}
                                />
                            ) : (
                                <Card className="max-h-[450px]" style={{ border: "3px solid #003399" }}>
                                    <CardHeader >
                                        <p className="kanit-semibold text-large">{post.title}</p>
                                    </CardHeader>
                                    <CardBody>
                                        <pre className="kanit-regular text-wrap">{post.content}</pre>
                                    </CardBody>
                                </Card>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div ref={loaderRef} className="h-10"></div>
        </>
    )
        ;
}