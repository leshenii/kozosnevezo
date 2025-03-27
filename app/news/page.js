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
    Input, Textarea, Image
} from "@heroui/react";
import {Skeleton} from "@heroui/skeleton";
import {BiLogoInstagram, BiLogoTiktok, BiMailSend} from "react-icons/bi";
import {useUser} from "@clerk/nextjs";

export default function NewsPage() {

    const [isFeedLoading, setIsFeedLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef(null);
    const [selectedPostTypes, setSelectedPostTypes] = useState(["tiktok", "instagram", "levelek"]);
    const [isPostTypeSelectionInvalid, setIsPostTypeSelectionInvalid] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [postTitleValue, setPostTitleValue] = useState("");
    const [postContentValue, setPostContentValue] = useState("");
    const {isLoaded, user} = useUser()


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
        }, {threshold: 1.0});

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
        return selectedPostTypes.includes('levelek') && post.title;
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="xl" isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    label="Add meg a közlemény címét" variant="bordered" className="pr-4" isRequired
                                    color="primary" radius="full" value={postTitleValue}
                                    onValueChange={setPostTitleValue}
                                />
                            </ModalHeader>
                            <ModalBody>
                                <Textarea color="primary" variant="bordered" radius="lg"
                                          placeholder="Mit szeretnél közölni?" minRows={7} maxRows={15}
                                          value={postContentValue} onValueChange={setPostContentValue}/>
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
            <div className='flex flex-col sm:flex-row  w-11/12'>
                <h1 className="sm:hidden mb-5 title w-full sm:w-2/6 text-center">Hírek</h1>
                <div className="flex flex-col sm:flex-row w-full sm:w-2/6 mb-3 sm:mb-0">
                    <div className="w-auto flex flex-col sm:mb-3">
                        <div className="flex flex-row gap-1 items-center my-2 sm:mt-8">
                            <Image radius="full" alt="saly_hun" src="/saly_hun.jpg" width={40}></Image>
                            <p className="text-gray-600">A <span className="italic">Supporters of Alternative Learning for Youth</span> együttműködésével</p>
                        </div>
                        <CheckboxGroup
                            color="primary"
                            defaultValue={["tiktok", "instagram", "levelek"]}
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
                            <Checkbox className="mr-1" value="tiktok"><div className="flex flex-row gap-1 items-center"> <BiLogoTiktok/> TikTok</div></Checkbox>
                            <Checkbox className="mr-1" value="instagram">
                                <div className="flex flex-row gap-1 items-center"><BiLogoInstagram/> Instagram</div>
                            </Checkbox>
                            <Checkbox value="levelek">
                                <div className="flex flex-row gap-1 items-center"><BiMailSend /> Levelek</div>
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                    {isLoaded && user && user.publicMetadata.role === "admin" && (
                    <div className="sm:hidden my-3 sm:my-auto h-full flex justify-end">
                        <Button color="primary" radius="full" variant="ghost"
                                onPress={onOpen} startContent={<BiMailSend size="1.5em" />}>
                            <p className='kanit-semibold text-large'>Új hírt közlök</p>
                        </Button>
                    </div>)}
                </div>
                <h1 className="hidden sm:block m-5 title w-2/6 text-center">Hírek</h1>
                <div className="w-1/6"></div>
                {isLoaded && user && user.publicMetadata.role === "admin" && (
                <div className="hidden sm:block w-1/6 text-right self-end mb-4">
                    <Button color="primary" radius="full" variant="ghost"
                            onPress={onOpen} startContent={<BiMailSend size="1.5em" />}>
                        <p className='kanit-semibold text-large'>Új hírt közlök</p>
                    </Button>
                </div>)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 w-11/12 gap-4 mb-4">
                {isFeedLoading ? (
                    <>
                        {[...Array(12)].map((_, index) => (
                            <Skeleton key={index} className="">
                                <div className="h-[550px] sm:h-[450px] rounded-lg bg-default-300"/>
                            </Skeleton>
                        ))}
                    </>
                ) : (
                    filteredUrls.slice(0, visibleCount).map((post, index) => (
                        <div key={index}>
                            {post.url ? (
                                <iframe
                                    width="100%"
                                    src={post.url}
                                    className="h-[550px] sm:h-[450px]"
                                />
                            ) : (
                                <Card className="h-[550px] sm:h-[450px]" style={{border: "3px solid #003399"}}>
                                    <CardHeader>
                                        <p className="kanit-semibold text-large">{post.title}</p>
                                    </CardHeader>
                                    <CardBody>
                                        <pre className="kanit-regular text-justify text-wrap">{post.content}</pre>
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