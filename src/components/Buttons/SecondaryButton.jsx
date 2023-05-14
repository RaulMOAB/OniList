import React from "react";

export default function SecondaryButton({ text, event = null }) {
	return (
		<>
			{event ? (
				<button
					onClick={event}
					className='py-2 px-4 bg-secondary text-white font-semibold  rounded-sm shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
					{text}
				</button>
			) : (
				<button className='py-2 px-4 bg-secondary text-white font-semibold  rounded-sm shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
					{text}
					
				</button>
			)}
		</>
	);
}
