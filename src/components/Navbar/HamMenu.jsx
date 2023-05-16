/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaBookOpen, FaUser, FaPlay, FaUserPlus } from "react-icons/fa";
import { IoSettingsSharp, IoNotifications, IoSearch } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import ConfirmModal from '@/components/Modals/ConfirmModal';

import Link from "next/link";


const HamMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const { user, logout, isUserAuthenticated } = useContext(AuthContext);

	const toggleMenu = () => setShowMenu(!showMenu);


	return (
		<>
			{isUserAuthenticated() ? (
				<nav className='lg:hidden bg-base-100 fixed bottom-6 right-4 p-2 rounded-md z-50'>
					<button
						className='block lg:hidden text-4xl text-primary'
						onClick={toggleMenu}>
						{showMenu ? <FaTimes /> : <FaBars />}
					</button>
					<div
						className={`lg:hidden fixed bottom-6 right-4  rounded-md bg-base-100 transition-all  duration-100 ${
							showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}>
						<div className='p-6'>
							<div className='grid grid-cols-3 gap-2'>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/home/" + user.username}>
										<div className='flex items-center justify-center'>
											<AiFillHome className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>home</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/home/" + user.username + "/animelist"}>
										<div className='flex items-center justify-center'>
											<FaPlay className='text-accent w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>anime</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/home/" + user.username + "/mangalist"}>
										<div className='flex items-center justify-center'>
											<FaBookOpen className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>manga</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/settings/"}>
										<div className='flex items-center justify-center'>
											<FaUser className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent  text-xs'>profile</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/settings/account"}>
										<div className='flex items-center justify-center'>
											<IoSettingsSharp className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent  text-xs'>settings</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/search/anime"}>
										<div className='flex items-center justify-center'>
											<IoSearch className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>browser</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2 '>
									<div className='flex items-center justify-center'>
										<label htmlFor='confirm-logout'>
											<FiLogOut className='text-accent text-center cursor-pointer w-6 h-6' />
											<p className='text-accent text-xs cursor-pointer'>
												logout
											</p>
										</label>
									</div>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mt-4'>
									<div className='absolute bottom-0  right-0 rounded-md bg-transparent w-12 h-12 flex items-center justify-center'>
										<button
											className='text-primary text-4xl'
											onClick={toggleMenu}>
											<FaTimes />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			) : (
				<nav className='lg:hidden bg-base-100 fixed bottom-6 right-4 p-2 rounded-md z-50'>
					<button
						className='block lg:hidden text-4xl text-primary'
						onClick={toggleMenu}>
						{showMenu ? <FaTimes /> : <FaBars />}
					</button>
					<div
						className={`lg:hidden fixed bottom-6 right-4  rounded-md bg-base-100 transition-all  duration-100 ${
							showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}>
						<div className='p-6'>
							<div className='grid grid-cols-3 gap-2'>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/"}>
										<div className='flex items-center justify-center'>
											<IoSearch className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>browser</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/login"}>
										<div className='flex items-center justify-center'>
											<FiLogIn className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>login</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mb-2'>
									<Link href={"/register"}>
										<div className='flex items-center justify-center'>
											<FaUserPlus className='text-accent  w-6 h-6' />
										</div>
										<p className='text-accent text-xs'>register</p>
									</Link>
								</div>
								<div
									onClick={() => {
										setShowMenu(false);
									}}
									className='flex flex-col items-center mt-4'>
									<div className='absolute bottom-0  right-0 rounded-md bg-transparent w-12 h-12 flex items-center justify-center'>
										<button
											className='text-primary text-4xl'
											onClick={toggleMenu}>
											<FaTimes />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			)}

			<ConfirmModal
				id={"confirm-logout"}
				header={"Confirm logout"}
				message={"Are you sure you want to logout?"}
				confirm_button_text='Yes, logout'
				action={logout}
			/>
		</>
	);
};

export default HamMenu;
