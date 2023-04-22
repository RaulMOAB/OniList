import React from "react";

export default function LoginButton({ text }) {
	return (
		<>
			<button className='py-2 px-4 bg-primary text-white font-semibold  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0'>
				{text}
			</button>
		</>
	);
}
