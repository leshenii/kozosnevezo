import React from "react";

export default function SignUpLayout(props) {
	const { children } = props;
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center responsive-height">
				{children}
			</div>
		</section>
	);
}
