"use client";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import {useEffect, useState} from "react";

export const AnimatedTestimonials = ({
                                         testimonials,
                                         autoplay = false
                                     }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const rotationValues = [7, -5, 3, -8, 2];

    return (
        <div className=" mx-auto sm:mr-[5%] antialiased font-sans px-4 md:px-8 lg:px-12 ">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className=" relative h-80 w-80 justify-self-center sm:justify-self-end">
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.src}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: rotationValues[index % rotationValues.length],
                                }}
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.7,
                                    scale: isActive(index) ? 1 : 0.95,
                                    z: isActive(index) ? 0 : -100,
                                    rotate: isActive(index) ? 0 : rotationValues[index % rotationValues.length],
                                    zIndex: isActive(index)
                                        ? 10
                                        : testimonials.length + 2 - index,
                                    y: isActive(index) ? [0, -80, 0] : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: rotationValues[index % rotationValues.length],
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 origin-bottom">
                                <Image
                                    src={testimonial.src}
                                    alt={testimonial.name}
                                    width={550}
                                    height={550}
                                    draggable={false}
                                    className="h-full w-full rounded-3xl object-cover object-center"/>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col pb-4">
                    <div className="flex gap-3 pb-3">
                        <button
                            onClick={handlePrev}
                            className="h-7 w-7 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center group/button">
                            <IconArrowLeft
                                className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300"/>
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-7 w-7 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center group/button">
                            <IconArrowRight
                                className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300"/>
                        </button>
                    </div>
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}>
                        <h3 className="text-2xl font-bold dark:text-white text-black">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-neutral-500">
                            {testimonials[active].designation}
                        </p>
                        <motion.p className="text-lg text-gray-800 mt-5 dark:text-neutral-300">
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block">
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};