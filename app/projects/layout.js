import React from "react";

export default function ProjectsLayout(props) {
    const { children } = props;
    return (
        <section className="flex flex-col items-center justify-center">
            {children}
        </section>
    );
}
