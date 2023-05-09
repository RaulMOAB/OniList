import React from 'react'
import Link from 'next/link'
import { AuthContext } from "@/contexts/AuthContext";
import {  useContext } from 'react';

function HomeNavbar() {
	const { user } = useContext(AuthContext);

	if(user){
		return (
			<div className='navbar bg-base-100 text-accent text-sm overflow-x-auto'>
				<div className='navbar-start'></div>
				<div className='navbar-center '>
					<ul className='menu menu-horizontal px-1'>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username}>Home</Link>
						</li>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username + "/animelist"}>
								Anime List
							</Link>
						</li>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username + "/mangalist"}>
								Manga List
							</Link>
						</li>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username + "/favorites"}>
								Favorites
							</Link>
						</li>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username + "/stats/overview"}>Stats</Link>
						</li>
						<li className='ml-10'>
							<Link className='active:bg-transparent hover:bg-transparent' href={"/home/" + user.username + "/social"}>Social</Link>
						</li>
					</ul>
				</div>
				<div className='navbar-end'></div>
			</div>
		);
	}
}

export default HomeNavbar