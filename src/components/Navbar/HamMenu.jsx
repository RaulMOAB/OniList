/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaBookOpen, FaUser, FaPlay } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import Link from "next/link";


const HamMenu = () => {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

	return (
		<>
			<nav className='bg-slate-700 fixed bottom-6 right-4 p-2 rounded-md z-50'>
				<button
					className='block md:hidden text-4xl text-blue-500'
					onClick={toggleMenu}>
					{showMenu ? <FaTimes /> : <FaBars />}
				</button>
				<div
					className={`md:hidden fixed bottom-6 right-4 w-52 rounded-md bg-white transition-all ease-in-out duration-500 ${
						showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
					}`}>
					<div className='p-6'>
						<div className='grid grid-cols-3 gap-2'>
							<div className='flex flex-col items-center'>
								<Link href={"/home"}>
									<div className='flex items-center justify-center'>
										<AiFillHome className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>home</p>
								</Link>
							</div>
							<div className='flex flex-col items-center'>
								<Link href={"/anime-list"}>
									<div className='flex items-center justify-center'>
										<FaPlay className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>anime</p>
								</Link>
							</div>
							<div className='flex flex-col items-center'>
								<Link href={"/manga-list"}>
									<div className='flex items-center justify-center'>
										<FaBookOpen className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>manga</p>
								</Link>
							</div>
							<div className='flex flex-col items-center'>
								<Link href={"/profile"}>
									<div className='flex items-center justify-center'>
										<FaBookOpen className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>profile</p>
								</Link>
							</div>
							<div className='flex flex-col items-center'>
								<Link href={"/settings"}>
									<div className='flex items-center justify-center'>
										<FaBookOpen className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>settings</p>
								</Link>
							</div>
							<div className='flex flex-col items-center'>
								<Link href={"/browser"}>
									<div className='flex items-center justify-center'>
										<FaBookOpen className='w-6 h-6' />
									</div>
									<p className='text-gray-700 text-xs'>browser</p>
								</Link>
							</div>
							<div className='flex flex-col items-center mt-4'>
								<div className='absolute bottom-0  right-0 rounded-md bg-transparent w-12 h-12 flex items-center justify-center'>
									<button
										className='text-gray-700 text-4xl'
										onClick={toggleMenu}>
										<FaTimes />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default HamMenu;
