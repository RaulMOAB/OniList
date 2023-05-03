import React from 'react'
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import Container from '../Common/PageContainer/Container';
const getUserDetails = async (id) => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+"user/"+id, {
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
					className='object-cover object-center h-full w-full filter saturate-100 contrast-100'
					width={100000}
					height={100000}
					src={user.banner_image}
					alt='banner'
				/>
			) : (
				<div className='w-full h-full bg-base-300'></div>
			)}
			<div className='absolute left-1/2 transform -translate-x-1/2 container '>
				<Image
					className='absolute w-28 sm:w-40 h-fit bottom-0 left-0'
					width={10000}
					height={10000}
					src={user.profile_image ? user.profile_image : "/"}
					alt='banner'
				/>
				<p className='text-white absolute left-32 sm:left-44 bottom-2 font-bold text-lg'>
					{user.username}
				</p>
			</div>
		</div>
	);
}

export default ProfileBanner;