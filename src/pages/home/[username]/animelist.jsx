import React from "react";
import Container from "@/components/Common/PageContainer/Container";
import { useState, useEffect, useContext } from "react";
import FilterMedia from "@/components/UserList/FilterMedia";
import MediaList from "@/components/UserList/MediaList";
import { AuthContext } from "@/contexts/AuthContext";
import MediaEditor from "@/components/Modals/MediaEditor";
import Alert from "@/components/Alerts/Alert_prueba";
import NoContent from "@/components/Skeleton/NoContent";
import Head from "next/head";

export default function AnimeList() {
	const { user, fetchData } = useContext(AuthContext);
	const [animelistStatus, setAnimelistStatus] = useState([]);
	const [filteredAnime, setFilteredAnime] = useState([]);
	const [actualStatus, setActualStatus] = useState("");
	const [selectedMedia, setSelectedMedia] = useState({});//For change the media props in mediaEditor 
	const [deletedMedia, setDeletedMedia] = useState(false);
	const [noData, setNoData] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	//Alert states
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");

	/**
	 * Update the status of the selected media each time the status changes
	 * if response is OK show alert
	 * @param {string} status
	 * @param {boolean} deleted
	 * @param {boolean} favorite
	 */
	const updateStatus = async (status, deleted, favorite) => {
		setActualStatus(status);
		const body = JSON.stringify({
			user_id: user.id,
			media_id: selectedMedia.media_id,
			status: status,
			favorite,
		});
		if (deleted) {
			setMessage(`${selectedMedia.title} was deleted from your list.`);
			setShowError(true);
		} else {
			const response = await fetchData("status", "POST", body);
			if (response) {
				setMessage(`${selectedMedia.title} added to ${status} list.`);
				setShowError(true);
			}
		}
	};

	/**
	 * maintains consistency of data if any status of the media changes
	 */
	useEffect(() => {
		if (user.username) {
			let endpoint = `library/${user.username}/animelist`;
			let method = "GET";
			fetchData(endpoint, method).then((res_animelist) => {
				
				if (!res_animelist.error) {
					setNoData(false);
					setFilteredAnime(res_animelist ?? []);
					setAnimelistStatus(res_animelist ?? []);
				} else {
					setNoData(true);
					setAuthenticated(false);
				}
			});
		}
	}, [user, fetchData, actualStatus, selectedMedia]);

	if (!authenticated) {
		return null;
	}

	//Initialize the lists
	let watching_list = [];
	let rewatching_list = [];
	let completed_list = [];
	let paused_list = [];
	let dropped_list = [];
	let planning_list = [];

	//Fill in the lists depending on their status
	watching_list = filteredAnime.filter((media) => {
		return media.status.status === "WATCHING";
	});
	rewatching_list = filteredAnime.filter((media) => {
		return media.status.status === "REWATCHING";
	});
	completed_list = filteredAnime.filter((media) => {
		return media.status.status === "COMPLETED";
	});
	paused_list = filteredAnime.filter((media) => {
		return media.status.status === "PAUSED";
	});
	dropped_list = filteredAnime.filter((media) => {
		return media.status.status === "DROPPED";
	});
	planning_list = filteredAnime.filter((media) => {
		return media.status.status === "PLAN TO WATCH";
	});

	return (
		<>
			<Head>
				<title>Animelist · Onilist</title>
			</Head>
			<Alert
				show={showError}
				message={message}
				seconds={4}
				setShowError={setShowError}
				type={"success"}
				top='-top-24'
			/>
			{!noData ? (
				<Container>
					{}
					<div className='grid lg:grid-cols-6 gap-4 py-6'>
						<div className=' bg-neutral col-span-5 lg:col-span-1 h-fit lg:sticky lg:top-5 rounded-md'>
							<FilterMedia
								key={12}
								type='ANIME'
								medias={animelistStatus}
								setFilteredMedia={setFilteredAnime}
							/>
						</div>
						<div className=' col-span-5 w-full gap-2 bg-neutral p-5 rounded-md h-fit'>
							{filteredAnime.length !== 0 ? (
								<>
									<MediaList
										key={1}
										list={"Watching"}
										medias={watching_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={2}
										list={"Plan to watch"}
										medias={planning_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={3}
										list={"Completed"}
										medias={completed_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={4}
										list={"Rewatching"}
										medias={rewatching_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={5}
										list={"Paused"}
										medias={paused_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={6}
										list={"Dropped"}
										medias={dropped_list}
										setStatus={setActualStatus}
										setSelectedMedia={setSelectedMedia}
									/>
								</>
							) : (
								<NoContent message={"Anime not found"} />
							)}
						</div>
					</div>
					{/* MODAL */}
					<input
						type='checkbox'
						id='my-modal-4'
						className='modal-toggle'
					/>
					<MediaEditor
						user={user.id}
						media={selectedMedia}
						actualStatus={actualStatus}
						updateStatus={updateStatus}
					/>
				</Container>
			) : (
				<div className='h-screen text-accent text-center text-2xl pt-20'>
					<p>(╯°□°）╯︵ ┻━┻ </p>
					<i className='text-sm'>Nothing to see here</i>
				</div>
			)}
		</>
	);
}
