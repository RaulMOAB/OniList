import React from "react";
import FavoritesCards from "../../../components/Card/FavoritesCards";

export default function Home({ library }) {
	const favoriteAnimes = [];

	library.forEach((media_info, index) => {
		favoriteAnimes.push(
			<FavoritesCards
				key={index}
				type={media_info.media.type}
				media_id={media_info.media.media_id}
				image={media_info.media.extra_large_cover_image}
				title={media_info.media.title}
			/>
		);
	});

	return (
		library && (
			<>
				<div className='w-full grid grid-cols-2 gap-4 p-6 text-accent'>
					<div>
						<div className='mb-3'>
							<p className='font-semibold'>Favorites Animes</p>
							<div className='bg-neutral rounded-md p-5 grid grid-cols-5 gap-2'>
								{favoriteAnimes}
							</div>
						</div>
						<div className='mb-3'>
							<p className='font-semibold'>Favorites Mangas</p>
							<div className='bg-neutral rounded-md p-5 grid grid-cols-5 gap-2'>
								{favoriteAnimes}
							</div>
						</div>
					</div>
					<div>
						<p className='font-semibold'>Activity</p>
						<div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
							<div className='bg-neutral rounded-md w-full h-20 mb-3 text-center'>
								Activity 1
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}

export async function getServerSideProps(context) {
	let username = context.params.username;
	const response = await fetch(
		"http://127.0.0.1:8000/api/library/" + username,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
	);
	const data = await response.json();
	return {
		props: { library: data },
	};
}
