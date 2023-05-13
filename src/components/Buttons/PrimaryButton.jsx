import React from "react";

export default function PrimaryButton({ text , event = null}) {
	return (
		<>
			{event ? (
				<button
					onClick={event}
					className='py-2 px-4 bg-primary text-white font-semibold  rounded-sm shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
					{text}
				</button>
			) : (
				<button className='py-2 px-4 bg-primary text-white font-semibold  rounded-sm shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
					{text}
				</button>
			)}
		</>
	);
}
