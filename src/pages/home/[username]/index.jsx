import React from "react";
import FavoritesCards from "@/components/Card/FavoritesCards";
import UserActivity from "@/components/ActivityCard/UserActivity";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import NoContent from "@/components/Skeleton/NoContent";
import AuthRequired from "../../../components/Common/AuthRequired";
export default function Home() {
	const { user, fetchData } = useContext(AuthContext);
	const [library, setLibrary] = useState([]);

	useEffect(() => {
		if(user.username){
			const endpoint = "library/" + user.username;
			const method = "GET";
			fetchData(endpoint, method).then((res) => {
				setLibrary(res ?? []);
				
			});
		}
	}, [user,fetchData]);

	const description = user.description;
	const favoriteAnimes = [];
	const favoriteMangas = [];
	const userActivity = [];
	let nothingToSee = false;

	const [visibleCount, setVisibleCount] = useState(5);
	const handleLoadMore = () => {
		setVisibleCount(visibleCount + 5);
	};

	if(library){
		
		let recent_changes_library = library.sort(function (a, b) {
			return new Date(b.status.updated_at) - new Date(a.status.updated_at);
		});
		recent_changes_library.forEach((media_info, index) => {
			let media_status = media_info.status;
			userActivity.push(
				<UserActivity
					key={index}
					media={media_info.media}
					status={media_status}
				/>
			);
			if (media_info.media.type === "ANIME" && media_status.favorite === 1) {
				favoriteAnimes.push(
					<FavoritesCards
						key={index}
						type={media_info.media.type}
						media_id={media_info.media.media_id}
						image={media_info.media.extra_large_cover_image}
						title={media_info.media.title}
					/>
				);
			} else if (
				media_info.media.type === "MANGA" &&
				media_status.favorite === 1
			) {
				favoriteMangas.push(
					<FavoritesCards
						key={index}
						type={media_info.media.type}
						media_id={media_info.media.media_id}
						image={media_info.media.extra_large_cover_image}
						title={media_info.media.title}
					/>
				);
			}
		});
	}

	nothingToSee =
		favoriteAnimes.length === 0 &&
		favoriteMangas.length === 0 &&
		userActivity.length === 0 && library.length !== 0;
	return (
		<>

			{!nothingToSee ? (
				<div className='w-full grid lg:grid-cols-2 gap-4 p-6 text-accent'>
					<div>
						<div className='bg-neutral p-5 w-full rounded-md mb-3'>
							<p>{description}</p>
						</div>
						<div className='mb-3'>
							<p className='font-semibold mb-2'>Favorites Animes</p>
							{favoriteAnimes.length !== 0 ? (
								<div className='bg-neutral rounded-md p-5 grid grid-cols-4 md:grid-cols-5 gap-2'>
									{favoriteAnimes.reverse()}
								</div>
							) : (
								<div className='bg-neutral rounded-md col-span-full'>
									<NoContent message="You don't have favorites animes" />
								</div>
							)}
						</div>
						<div className='mb-3'>
							<p className='font-semibold mb-2'>Favorites Mangas</p>
								{favoriteMangas.length !== 0 ? (
									<div className='bg-neutral rounded-md p-5 grid grid-cols-4 md:grid-cols-5 gap-2'>
										{favoriteMangas.reverse()}
									</div>
								) : (
									<div className='bg-neutral rounded-md  col-span-full'>
										<NoContent message="You don't have favorites mangas" />
									</div>
								)}
						</div>
					</div>
					{userActivity.length !== 0 ? (
						<>
							<div>
								<p className='font-semibold mb-2'>Activity</p>
								<div>{userActivity.slice(0, visibleCount)}</div>
								{userActivity.length > 5 ? (
									<div
										onClick={handleLoadMore}
										className='btn w-full bg-neutral rounded-md h-12'>
										<p>Load More</p>
									</div>
								) : null}
							</div>
						</>
					) : (
						<div className='bg-neutral rounded-md h-fit'>
							<NoContent message="You don't have recent activities" />
						</div>
					)}
				</div>
			) : (
				<NoContent message="Error" />
			)}
		</>
	);
}
