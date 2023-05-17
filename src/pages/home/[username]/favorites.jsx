import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from "@/contexts/AuthContext";
import FavoriteMediaCard from '@/components/UserList/FavoriteMediaCard';
import ConfirmModal from "@/components/Modals/ConfirmModal";
import NoContent from "@/components/Skeleton/NoContent";
import Head from "next/head";

export default function Favorites() {
  const {user, fetchData} = useContext(AuthContext)
  const [favoritesMedias, setFavoritesMedias] = useState([]);
	const [selectedMedia, setSelectedMedia] = useState({})
  const [noData, setNoData] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);


  	useEffect(() => {
			if (user.username) {
				let endpoint = `library/${user.username}/favorites`;
				let method = "GET";
				fetchData(endpoint, method).then((res_favorites) => {
					if(!res_favorites.error){
						setNoData(false)
						setFavoritesMedias(res_favorites ?? []);
					}else{
						setNoData(true);
						setAuthenticated(false);
					}
				});
			}
		}, [user, fetchData, selectedMedia]);
		if(!authenticated){return null}
		const updateFavoriteStatus = ()=>{
			let endpoint = "media/favorite"
			let method = "POST"
			const favorite = 0;
			console.log(selectedMedia)
			
			let body = JSON.stringify({
				user_id: user.id,
				media_id:selectedMedia.media_id,
				favorite
			})

			fetchData(endpoint, method, body).then((res)=>{
				console.log(res)
			});
			setSelectedMedia({})
		}

		let favoritesAnimes = [];
		let favoritesMangas = [];

		favoritesMedias.forEach((media, index)=>{
			if (media.status.length !== 0 && media.status[0].favorite === 1) {
				if (media.media.type === "ANIME") {
					favoritesAnimes.push(
						<FavoriteMediaCard
						key={index}
							media={media}
							setSelectedMedia={setSelectedMedia}
						/>
					);
				} else {
					favoritesMangas.push(
						<FavoriteMediaCard
						key={index}
							media={media}
							setSelectedMedia={setSelectedMedia}
						/>
					);
				}
			}
		})


  return (
		<>
			<Head>
				<title>Favorites · Onilist</title>
			</Head>
			<div className='grid grid-cols-12 my-5 py-5 rounded-md bg-base-100'>
				<div className='col-span-12 p-8 mb-4 '>
					<span className='text-accent'>Anime</span>
					<div className='grid grid-cols-3 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 gap-5 mt-3 p-5 rounded-md bg-base-300'>
						{favoritesAnimes.length !== 0 ? (
							favoritesAnimes
						) : (
							<div className='col-span-12'>
								<NoContent message={"No favorites yet"} />
							</div>
						)}
					</div>
				</div>
				<div className='col-span-12 p-8 mb-4 '>
					<span className='text-accent'>Manga</span>
					<div className='grid grid-cols-3 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 gap-5 mt-3 p-5 rounded-md bg-base-300'>
						{favoritesMangas.length !== 0 ? (
							favoritesMangas
						) : (
							<div className='col-span-12'>
								<NoContent message={"No favorites yet"} />
							</div>
						)}
					</div>
				</div>
				<ConfirmModal
					id={"confirm-delete-favorite"}
					header={"Delete from favorites"}
					message={"Are you sure you want to delete this media from favorites?"}
					confirm_button_text='Yes, delete'
					action={updateFavoriteStatus}
				/>
			</div>
		</>
	);
}
