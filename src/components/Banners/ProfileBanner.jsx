/* eslint-disable @next/next/no-img-element */
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
	const { user } = useContext(AuthContext);

	return (
		<div className='max-w-screen bg-neutral h-80 relative'>
			{user ? (
				<>
					<img
						draggable={false}
						className='object-cover object-center h-full w-full filter saturate-100 contrast-100'
						width={100000}
						height={100000}
						src={
							process.env.NEXT_PUBLIC_RESOURCES_BANNER + "" + user.banner_image
						}
						alt='banner'
					/>
					<div className='absolute w-full h-full bg-gradient-to-t from-black  opacity-60 top-0'></div>
			<div className='absolute left-1/2 transform -translate-x-1/2 container '>
				<img
					draggable={false}
					className='absolute w-28 sm:w-40 h-fit bottom-0 left-0 rounded-t-md'
					width={10000}
					height={10000}
					src={
						process.env.NEXT_PUBLIC_RESOURCES_PROFILE + "" + user.profile_image
					}
					alt='banner'
				/>
				<p className='text-white absolute left-32 sm:left-44 bottom-2 font-bold text-lg'>
					{user.username}
				</p>
			</div>
				</>
			) : (
				<div className='w-full h-full bg-base-300'></div>
			)}
		</div>
	);
}

export default ProfileBanner;