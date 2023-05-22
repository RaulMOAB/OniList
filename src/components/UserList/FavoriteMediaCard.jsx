import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

/**
 * media: get the properties of the media
 * setSelectedMedia: state from favorites.jsx to delete selected media from favorite list 
 * @param {object} media 
 * @param {function} setSelectedMedia 
 * @returns 
 */
export default function FavoriteMediaCard({ media, setSelectedMedia }) {
	const link =
		"/" + media.media.type.toLowerCase() + "/" + media.media.media_id;
	const image = media.media.extra_large_cover_image;
	const title = media.media.title;

	return (
		<div
			className='tooltip tooltip-bottom'
			data-tip={title}>
			<div className='relative h-full'>
				<Link href={link}>
					<Image
						className='rounded-md object-cover object-center h-full w-fit'
						alt='cover image'
						src={image}
						width={10000}
						height={1}></Image>
				</Link>
				<div className=' transition-all duration-300 text-accent text-sm absolute opacity-90 lg:opacity-0 lg:hover:opacity-90 h-full w-full bottom-0'>
					<div className='absolute -top-2 -right-2 lg:-top-3 lg:-right-3 bg-secondary rounded-full '>
						<label
							onClick={() => {
								setSelectedMedia(media.media);
							}}
							htmlFor='confirm-delete-favorite'
							className='text-white rounded-full text-xl lg:text-2xl cursor-pointer'>
							<IoMdClose />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
