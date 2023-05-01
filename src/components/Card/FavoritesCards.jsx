import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function FavoritesCards({ type, media_id, image, title}) {
	const link = '/'+type.toLowerCase()+'/'+media_id
	return (
		<div
			className='tooltip'
			data-tip={title}>
			<Link href={link}>
				<Image
					className='rounded-md w-fit h-full'
					alt='cover image'
					src={image}
					width={1000}
					height={1}></Image>
			</Link>
		</div>
	);
}
