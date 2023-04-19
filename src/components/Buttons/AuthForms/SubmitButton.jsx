import React from "react";

export default function LoginButton({text}) {
	return (
		<>
			<button className='py-2 px-4 bg-blue-400 text-white font-semibold  rounded  hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
				{text}
			</button>
		</>
	);
}
