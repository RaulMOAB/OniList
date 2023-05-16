/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useState , useEffect} from 'react';
import { timeLeftSince , formatDate } from "@/components/utils/DateUtils";

export default function UserActivity({media, status}) {
	const [leftTime, setTimeLetf] = useState('');
	const [startedAt, setStartedAt] = useState("");
	console.log(status)
  let url ='/'+media.type.toLowerCase()+'/'+media.media_id
	let type_status = status.status;
	if(media.type==="MANGA"){
		switch (type_status) {
			case "WATCHING":
					type_status = "READING";
					break;
				case "REWATCHING":
					type_status = "REREADING";
					break;
				case "PLAN TO WATCH":
					type_status = "PLAN TO READ";
					break;
				default:
					break;
			}
		}
	useEffect(() => {
		setTimeLetf(timeLeftSince(status.updated_at));
	}, [status, status, media]);

	let message = "";
	let episodes = status.progress;
	if(type_status === 'WATCHING' || type_status === "READING"){
		if(episodes!== 0){
			message = `${type_status} ${media.type === "ANIME"? "episode":"chapter"} ${episodes} of `
		}else{
			message = `Started to ${media.type === "ANIME" ? "watch" : "read"} `;
		}
	}else if(type_status === 'PAUSED'){
				if (episodes !== 0) {
					message = `${type_status} ${
						media.type === "ANIME" ? "in episode" : "in chapter"
					} ${episodes} `;
				} else {
					message = `${type_status}  `;
				}
	}else{
		message = `${type_status} `;
	}



  return (
		<div className='bg-neutral w-full h-32 mb-3 rounded-md text-sm xl:text-md md:text-md flex'>
			<div className='flex w-28'>
				<Image
					src={media.extra_large_cover_image}
					width={10000}
					height={1}
					className='rounded-l-md'
					alt='media cover image'></Image>
			</div>
			<div className='flex w-1/2 items-center'>
				<p className='pl-5 inline-block'>
					{message}
					<Link href={url}>
						<span className='text-primary'>{media.title}</span>
					</Link>
				</p>
			</div>
			<div className='flex w-1/2 flex-col items-end pr-3 pt-3 text-accent text-xs lg:text-sm  font-normal'>
				<div className='h-1/3 '>
					<p>{leftTime}</p>
				</div>
				<div className='h-1/3'></div>
				{startedAt ? (
					<div className='h-1/3'></div>
				) : (
					<div className='h-1/3'></div>
				)}
			</div>
		</div>
	);
}