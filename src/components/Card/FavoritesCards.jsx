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
					className='rounded-md w-32 h-44'
					alt='cover image'
					src={image}
					width={100}
					height={1}></Image>
			</Link>
		</div>
	);
}
