import React from "react";
import Link from "next/link";
import Image from "next/image";
import MediaEditor from "@/components/Modals/MediaEditor";
import { useState, useContext, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import {AiFillHeart} from 'react-icons/ai'
import { AuthContext } from "@/contexts/AuthContext";

export default function ListCards({ media ,setStatus, setSelectedMedia}) {
	const handleClick = ()=>{
		setStatus(media.status[0].status)
		setSelectedMedia(media.media)
	}

	const link =
		"/" + media.media.type.toLowerCase() + "/" + media.media.media_id;
	const image = media.media.extra_large_cover_image;
	const title = media.media.title;
	const episodes = media.media.episodes;

	return (
		<div className='relative'>
			<Link href={link}>
				<Image
					className='rounded-md'
					alt='cover image'
					src={image}
					width={10000}
					height={1}></Image>
			</Link>
			<div className='text-accent text-sm absolute opacity-90 lg:opacity-0 lg:hover:opacity-90 h-full w-full bottom-0'>
				<div className='absolute top-2 left-2'>
					{media.status[0].favorite === 1 ? (
						<AiFillHeart className='text-red-500 w-6 h-6 shadow-2xl drop-shadow-2xl' />
					) : null}
				</div>
				<div className='absolute top-2 right-2'>
					<label
						htmlFor='my-modal-4'
						onClick={handleClick}
						tabIndex={0}
						className={""}>
						<RiEdit2Fill className='h-8 w-8 p-2 text-white bg-primary-content hover:bg-primary border-none rounded-md cursor-pointer ' />
					</label>
				</div>
				<div className='absolute bottom-0 h-fit w-full p-1 bg-base-100'>
					<Link href={link}>
						<p className='hover:text-blue-500 hover:opacity-100 p-1'>{title}</p>
						<p className='hover:text-blue-500 hover:opacity-100 p-1'>{`${media.status[0].progress}/${episodes}`}</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
