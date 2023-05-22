/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import FavoritesCards from "@/components/Card/FavoritesCards";
import UserActivity from "@/components/ActivityCard/UserActivity";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import NoContent from "@/components/Skeleton/NoContent";
import AuthRequired from "../../../components/Common/AuthRequired";
import Head from "next/head";

export default function Home() {
	const { user, fetchData, hasChanged } = useContext(AuthContext);
	const [library, setLibrary] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [authenticated, setAuthenticated] = useState(true);


	//get all library of the user with status
	useEffect(() => {
		if(user.username){
			const endpoint = "library/" + user.username;
			const method = "GET";
			fetchData(endpoint, method).then((res) => {
				if(!res.error){
					setLibrary(res ?? []);
				}else{
					setAuthenticated(false)
				}
			});
		}
	}, [user,fetchData]);


	//Get user info
		useEffect(() => {
			if (Object.keys(user).length !== 0) {
				let endpoint = "user/" + user.id;
				fetchData(endpoint).then((res_user) => {
					setUserInfo(res_user);
				});
			} else {
				setUserInfo({});
			}
		}, [hasChanged,user]);

		

	//set description
	const description = userInfo.description ?? "You dont have description yet.";

	//Prepare variables for favorites and activities
	const favoriteAnimes = [];
	const favoriteMangas = [];
	const userActivity = [];
	let nothingToSee = false;

	//State of more button
	const [visibleCount, setVisibleCount] = useState(5);
	const handleLoadMore = () => {
		setVisibleCount(visibleCount + 5);
	};

	if (!authenticated) {
		return null;
	}


		let recent_changes_library = library.sort(function (media, next_media) {
			return (
				new Date(media.status.updated_at) -
				new Date(next_media.status.updated_at)
			);
		});

		//prepare html
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

	//If there are nothing to see.
	nothingToSee =
		favoriteAnimes.length === 0 &&
		favoriteMangas.length === 0 &&
		userActivity.length === 0 && library.length !== 0;
	return (
		<>
			<Head>
				<title>Home · Onilist</title>
			</Head>
			{!nothingToSee ? (
				<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 text-accent'>
					<div>
						<div className='bg-neutral w-full p-5 h-fit rounded-md mb-3'>
							<p className='whitespace-normal break-words'>{description}</p>
						</div>
						<div className='mb-3'>
							<p className='font-semibold mb-2'>Favorites Animes</p>
							{favoriteAnimes.length !== 0 ? (
								<div className='bg-neutral rounded-md p-2 md:p-5  grid grid-cols-4 md:grid-cols-5 gap-2'>
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
								<div className='bg-neutral rounded-md p-2 md:p-5 grid grid-cols-4 md:grid-cols-5 gap-2'>
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
				<NoContent message='Error' />
			)}
		</>
	);
}
