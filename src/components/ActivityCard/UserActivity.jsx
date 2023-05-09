import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useState , useEffect} from 'react';
import { timeLeftSince , formatDate } from "@/components/utils/DateUtils";

export default function UserActivity({media, status}) {
	const [leftTime, setTimeLetf] = useState('');
	const [startedAt, setStartedAt] = useState("");

  let url ='/'+media.type.toLowerCase()+'/'+media.media_id


	useEffect(() => {
		setTimeLetf(timeLeftSince(status.updated_at));
		if (media.start_date) {
			setStartedAt(formatDate(status.start_date));
		}
	}, [status, status, media]);




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
					{status.status + " "}
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
					<div className='h-1/3'>Started at {startedAt}</div>
				) : (
					<div className='h-1/3'></div>
				)}
			</div>
		</div>
	);
}
