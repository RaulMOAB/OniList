import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function FavoritesCards({ image, title }) {
	return (
		<div
			className='tooltip'
			data-tip={title}>
			<Link href={"#"}>
				<Image
					className='rounded-md'
					alt='cover image'
					src={image}
					width={110}
					height={110}></Image>
			</Link>
		</div>
	);
}
