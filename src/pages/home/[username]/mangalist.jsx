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

export default function MangaList() {
	const { user, fetchData } = useContext(AuthContext);
	const [mangalistStatus, setMangaListStatus] = useState([]);
	const [filteredManga, setFilteredManga] = useState(mangalistStatus ?? []); //TODO
	const [status, setStatus] = useState("");
	const [deletedMedia, setDeletedMedia] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState({});
	const [noData, setNoData] = useState(false);
	const [authenticated, setAuthenticated] = useState(true);

	//Alert states
	const [showAlert, setShowAlert] = useState(false);
	const [message, setMessage] = useState("");

	/**
	 * Update the status of the selected media each time the status changes
	 * if response is OK show alert
	 * @param {string} selected_status
	 * @param {boolean} deleted
	 * @param {boolean} favorite
	 */
	const updateStatus = async (selected_status, deleted, favorite) => {
		setStatus(selected_status);
		const body = JSON.stringify({
			user_id: user.id,
			media_id: selectedMedia.media_id,
			status: selected_status,
			favorite,
		});
		if (deleted) {
			setMessage(`${selectedMedia.title} was deleted from your list.`);
			setShowAlert(true);
		} else {
			const response = await fetchData("status", "POST", body);
			//Change status according to the manga
			if (response) {
				switch (selected_status) {
					case "WATCHING":
						selected_status = "READING";
						break;
					case "REWATCHING":
						selected_status = "REREADING";
						break;
					case "PLAN TO WATCH":
						selected_status = "PLAN TO READ";
						break;
					default:
						selected_status = selected_status;
						break;
				}

				setMessage(`${selectedMedia.title} added to ${selected_status} list.`);
				setShowAlert(true);
			}
		}
	};

	/**
	 * maintains consistency of data if any status of the media changes
	 */
	useEffect(() => {
		if (user.username) {
			let endpoint = `library/${user.username}/mangalist`;
			let method = "GET";
			fetchData(endpoint, method).then((res_mangalist) => {
				if (!res_mangalist.error) {
					setNoData(false);
					setFilteredManga(res_mangalist ?? []);
					setMangaListStatus(res_mangalist);
				} else {
					setNoData(true);
					setAuthenticated(false);
				}
			});
		}
	}, [user, status, fetchData, selectedMedia, deletedMedia]);
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
	watching_list = filteredManga.filter((media) => {
		return media.status.status === "WATCHING";
	});
	rewatching_list = filteredManga.filter((media) => {
		return media.status.status === "REWATCHING";
	});
	completed_list = filteredManga.filter((media) => {
		return media.status.status === "COMPLETED";
	});
	paused_list = filteredManga.filter((media) => {
		return media.status.status === "PAUSED";
	});
	dropped_list = filteredManga.filter((media) => {
		return media.status.status === "DROPPED";
	});
	planning_list = filteredManga.filter((media) => {
		return media.status.status === "PLAN TO WATCH";
	});

	return (
		<>
			<Head>
				<title>Mangalist · Onilist</title>
			</Head>
			<Alert
				show={showAlert}
				message={message}
				seconds={3}
				setShowError={setShowAlert}
				type={"success"}
				top='-top-24'
			/>
			{!noData ? (
				<Container>
					<div className='grid lg:grid-cols-6 gap-4 py-6'>
						<div className=' bg-neutral col-span-5 lg:col-span-1 h-fit lg:sticky lg:top-5 rounded-md'>
							<FilterMedia
								type='MANGA'
								medias={mangalistStatus}
								setFilteredMedia={setFilteredManga}
							/>
						</div>
						<div className=' col-span-5 w-full gap-2 bg-neutral p-5 rounded-md h-fit'>
							{filteredManga.length !== 0 ? (
								<>
									<MediaList
										list={"Reading"}
										medias={watching_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										list={"Plan to read"}
										medias={planning_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										list={"Completed"}
										medias={completed_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										list={"Rereading"}
										medias={rewatching_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										list={"Paused"}
										medias={paused_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										list={"Dropped"}
										medias={dropped_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
								</>
							) : (
								<NoContent message={"Manga not found"} />
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
						actualStatus={status}
						updateStatus={updateStatus}
						deletedMedia={setDeletedMedia}
					/>
				</Container>
			) : (
				<NoContent message={"You dont have Manga in your library"} />
			)}
		</>
	);
}
