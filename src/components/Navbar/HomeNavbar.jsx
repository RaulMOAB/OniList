/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Link from 'next/link'
import { AuthContext } from "@/contexts/AuthContext";
import {  useContext,useState,useEffect } from 'react';

function HomeNavbar() {
	const { user, fetchData, hasChanged } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			let endpoint = "user/" + user.id;
			fetchData(endpoint).then((res_user) => {
				setUserInfo(res_user);
			});
		} else {
			setUserInfo({});
		}
	}, [ hasChanged,user]);
	
	if(user){
		return (
			<div className='navbar bg-base-100 text-accent z-20 text-sm overflow-x-auto'>
				<div className='navbar-start'></div>
				<div className='navbar-center '>
					<ul className='menu menu-horizontal px-1'>
						<li className='ml-10'>
							<Link
								className='active:bg-transparent hover:bg-transparent'
								href={"/home/" + userInfo.username}>
								Home
							</Link>
						</li>
						<li className='ml-10'>
							<Link
								className='active:bg-transparent hover:bg-transparent'
								href={"/home/" + userInfo.username + "/animelist"}>
								Anime List
							</Link>
						</li>
						<li className='ml-10'>
							<Link
								className='active:bg-transparent hover:bg-transparent'
								href={"/home/" + userInfo.username + "/mangalist"}>
								Manga List
							</Link>
						</li>
						<li className='ml-10'>
							<Link
								className='active:bg-transparent hover:bg-transparent'
								href={"/home/" + userInfo.username + "/favorites"}>
								Favorites
							</Link>
						</li>
						<li className='ml-10'>
							<Link
								className='active:bg-transparent hover:bg-transparent'
								href={"/home/" + userInfo.username + "/stats/overview"}>
								Stats
							</Link>
						</li>
					</ul>
				</div>
				<div className='navbar-end'></div>
			</div>
		);
	}
}

export default HomeNavbar