import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
const getUserDetails = async (id) => {
	const response = await fetch("http://127.0.0.1:8000/api/user/"+id, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export function ProfileBanner() {
	const { getUserID } = useContext(AuthContext);
	const [user, setUser] = useState({})
	useEffect(()=>{
		getUserDetails(getUserID()).then((res)=>{
			setUser(res)
		});
	},[getUserID])
	return (
		<div className='max-w-screen bg-neutral h-80 relative'>
			{user.banner_image ? (
				<Image
					className='w-full h-full filter saturate-100 contrast-100'
					width={100000}
					height={100000}
					src={user.banner_image}
					alt='banner'
				/>
			) : (
				<div className='w-full h-full bg-base-300'></div>
			)}
			<div className='relative w-96'>
				<Image
					className='absolute w-48 h-fit bottom-0 right-20'
					width={10000}
					height={10000}
					src={
						user.profile_image
							? user.profile_image
							: ""
					}
					alt='banner'
				/>
				<p className='text-white absolute -right-5 bottom-2 font-bold text-lg'>
					{user.username}
				</p>
			</div>
		</div>
	);
}

export default ProfileBanner;