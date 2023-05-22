import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import FavoriteMediaCard from "@/components/UserList/FavoriteMediaCard";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import NoContent from "@/components/Skeleton/NoContent";
import Alert from "@/components/Alerts/Alert_prueba";
import Head from "next/head";

export default function Favorites() {
	const { user, fetchData } = useContext(AuthContext);
	const [favoritesMedias, setFavoritesMedias] = useState([]);
	const [selectedMedia, setSelectedMedia] = useState({});
	const [noData, setNoData] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);
	//Alert states
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");
	const [typeAlert, setTypeAlert] = useState("");

	useEffect(() => {
		if (user.username) {
			let endpoint = `library/${user.username}/favorites`;
			let method = "GET";
			fetchData(endpoint, method).then((res_favorites) => {
				if (!res_favorites.error) {
					setNoData(false);
					setFavoritesMedias(res_favorites ?? []);
				
				} else {
					setNoData(true);
					setAuthenticated(false);
				}
			});
		}
	}, [user, fetchData, selectedMedia]);
	if (!authenticated) {
		return null;
	}
	const updateFavoriteStatus = () => {
		let endpoint = "library/delete/favorite";
		let method = "POST";
		const favorite = 0;
		

		let body = JSON.stringify({
			user_id: user.id,
			media_id: selectedMedia.media_id,
			favorite,
		});

		fetchData(endpoint, method, body).then((response) => {
			let response_key = Object.keys(response)[0];
			if (response_key === "success") {
				setTypeAlert(response_key);
				setMessage(
					selectedMedia.title +
						" was deleted from your " +
						selectedMedia.type.toLowerCase() +
						" favorite list."
				);
				setShowError(true);
			} else {
				setTypeAlert(response_key);
				setMessage(response[response_key]);
				setShowError(true);
			}
		});
		setSelectedMedia({});
	};

	let favoritesAnimes = [];
	let favoritesMangas = [];

	favoritesMedias.forEach((media, index) => {
		if (media.status && media.status.favorite === 1) {
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
	});

	return (
		<>
			<Head>
				<title>Favorites · Onilist</title>
			</Head>
			<Alert
				show={showError}
				message={message}
				seconds={3}
				setShowError={setShowError}
				type={typeAlert}
			/>
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
