import React from "react";

export default function AboutLayout(props) {
    const { children } = props;
    return (
        <section className="flex flex-col items-center justify-center">
            {children}
        </section>
    );
}
