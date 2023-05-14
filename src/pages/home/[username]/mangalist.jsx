import React from "react";
import Container from "@/components/Common/PageContainer/Container";
import { useState, useEffect, useContext } from "react";
import FilterMedia from "@/components/UserList/FilterMedia";
import MediaList from "@/components/UserList/MediaList";
import { AuthContext } from "@/contexts/AuthContext";
import MediaEditor from "@/components/Modals/MediaEditor";
import Alert from "@/components/Alerts/Alert_prueba";
import NoContent from "@/components/Skeleton/NoContent";

export default function MangaList() {
	const { user, fetchData } = useContext(AuthContext);
	const [mangalistStatus, setMangaListStatus] = useState([]);
	const [filteredManga, setFilteredManga] = useState(mangalistStatus ?? []); //TODO
	const [status, setStatus] = useState("");
	const [deletedMedia, setDeletedMedia] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState({});
	const [noData, setNoData] = useState(false);
	//*Alert state
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");

	const updateStatus = async (status, deleted) => {
		setStatus(status); // cambia el texto del boton

		const body = JSON.stringify({
			user_id: user.id,
			media_id: selectedMedia.media_id,
			status: status,
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

	useEffect(() => {
		if (user.username) {
			let endpoint = `library/${user.username}/mangalist`;
			let method = "GET";
			fetchData(endpoint, method).then((res_mangalist) => {
				if (res_mangalist !== undefined) {
					setNoData(false);
					setFilteredManga(res_mangalist ?? []);
					setMangaListStatus(res_mangalist);
				} else {
					setNoData(true);
				}
			});
		}
	}, [user, status, fetchData, selectedMedia, deletedMedia]);

	const watching_list = filteredManga.filter((media) => {
		return media.status.status === "WATCHING";
	});
	const rewatching_list = filteredManga.filter((media) => {
		return media.status.status === "REWATCHING";
	});
	const completed_list = filteredManga.filter((media) => {
		return media.status.status === "COMPLETED";
	});
	const paused_list = filteredManga.filter((media) => {
		return media.status.status === "PAUSED";
	});
	const dropped_list = filteredManga.filter((media) => {
		return media.status.status === "DROPPED";
	});
	const planning_list = filteredManga.filter((media) => {
		return media.status.status === "PLAN TO WATCH";
	});

	return (
		<>
			<Alert
				show={showError}
				message={message}
				seconds={3}
				setShowError={setShowError}
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
