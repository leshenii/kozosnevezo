'use client'

import {useEffect, useRef, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    CheckboxGroup,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    useDisclosure,
    Input, Textarea,
} from "@heroui/react";
import {Skeleton} from "@heroui/skeleton";

export default function NewsPage() {

    const [isFeedLoading, setIsFeedLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);
    const [selectedPostTypes, setSelectedPostTypes] = useState(["tiktok", "instagram", "kozlemenyek"]);
    const [isPostTypeSelectionInvalid, setIsPostTypeSelectionInvalid] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [postTitleValue, setPostTitleValue] = useState("");
    const [postContentValue, setPostContentValue] = useState("");

    const fetchPosts = async () => {
        await fetch('/api/posts', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(postsLocale => {
                setPosts(postsLocale)
                setIsFeedLoading(false)
            })
            .catch(error => console.error('Error fetching urls:', error));
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log(postContentValue, postTitleValue)
    }, [postContentValue, postTitleValue]);

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
        if (selectedPostTypes.includes('tiktok') && post.url?.includes('www.tiktok.com')) {
            return true;
        }
        if (selectedPostTypes.includes('instagram') && post.url?.includes('www.instagram.com')) {
            return true;
        }
        return selectedPostTypes.includes('kozlemenyek') && post.title;
    });

    const savePostEvent = async () => {
        await fetch(`/api/posts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitleValue,
                content: postContentValue,
            })
        })
            .then(response => {
                if (response.ok) {
                } else {
                    throw new Error('Failed to create site post');
                }
            })
            .catch(error => console.error('Error creating site post:', error));
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    label="Add meg a közlemény címét" variant="bordered" className="pr-4" isRequired color="primary" radius="full" value={postTitleValue} onValueChange={setPostTitleValue}
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Textarea color="primary" variant="bordered" radius="lg" placeholder="Mit szeretnél közölni?" minRows={7} maxRows={15} value={postContentValue} onValueChange={setPostContentValue}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius="full" variant="light" onPress={onClose}>
                                    Bezárom
                                </Button>
                                <Button color="primary" radius="full" onPress={() => {
                                    onClose();
                                    savePostEvent().then(r => fetchPosts());
                                }}>
                                    Közzéteszem
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className='flex flex-row items-center w-full px-6'>
                <div className="w-2/6">
                    <CheckboxGroup
                        color="primary"
                        defaultValue={["tiktok", "instagram", "kozlemenyek"]}
                        label="Milyen híreket szeretnél látni?"
                        value={selectedPostTypes}
                        isPostTypeSelectionInvalid={isPostTypeSelectionInvalid}
                        onValueChange={(value) => {
                            setIsPostTypeSelectionInvalid(value.length < 1);
                            setSelectedPostTypes(value);
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
                            onPress={onOpen}>
                        <p className='kanit-semibold text-large'>Új hírt közlök</p>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 w-11/12 gap-4 mb-4">
                {isFeedLoading ? (
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
                                <Card className="h-[450px]" style={{ border: "3px solid #003399" }}>
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