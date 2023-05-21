import React from "react";
import Link from "next/link";

export default function Custom404() {
	return (
		<div class='bg-indigo-900 relative overflow-hidden h-fit'>
      {" "}
			<img
				src='/assets/404/oni.gif'
				class='absolute h-full w-full object-cover'
			/><div class='inset-0 bg-black opacity-25 absolute'></div>{" "}
			<div class='container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40'>{" "}
				<div class='w-full font-mono flex flex-col items-center relative z-10'>{" "}
					<h1 class='font-extrabold text-5xl text-center text-accent leading-tight mt-4'>
						You are all alone here{" "}
					</h1>
					{" "}
					<p class='font-extrabold text-8xl my-24 text-accent '>
						404{" "}
					</p>
					{" "}
					<Link href={"/"} class='font-extrabold text-2xl mx-auto text-accent-focus '>
						Go back home Oni{" "}
					</Link>
				</div>
				{" "}
			</div>
		</div>
	);
}
