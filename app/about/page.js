'use client'

import {AnimatedTestimonials} from "../components/animated-testimonials";

export default function AboutPage() {
    const testimonials = [
        {
            quote:
                "She has various experience in Erasmus+ and took part in over 30 mobilities, such as youth exchanges and training courses. She has led different kinds of groups and facilitated 8 projects. She has a patient, reliable personality and an open-minded approach to initiatives.",
            name: "Sándor Vanda",
            designation: "Special needs education therapist, currently a masters student as behaviour analyst",
            src: "/vanda-sandor.jpg",
        },
        {
            quote:
                "Laci bridges the gap between IT and social work, using technical skills to foster community engagement. Having participated in several mobility projects across Europe, he is passionate about embracing new cultures and fostering international collaborations. Focused and committed when it counts, but always open to a new adventure and a good time.",
            name: "Gulyás László",
            designation: "Computer Science student, IT support specialist",
            src: "/laszlo-gulyas.png",
        },

    ];
    return (
        <div>
            <h1 className="mt-5 title text-center">Rólunk</h1>
            <AnimatedTestimonials testimonials={testimonials}/>
        </div>
    );
}