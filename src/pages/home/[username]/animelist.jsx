import React from "react";
import Container from "@/components/Common/PageContainer/Container";
import { useState, useEffect, useContext } from "react";
import FilterMedia from "@/components/UserList/FilterMedia";
import MediaList from "@/components/UserList/MediaList";
import { AuthContext } from "@/contexts/AuthContext";
import MediaEditor from "@/components/Modals/MediaEditor";
import NoContent from "@/components/Skeleton/NoContent";

export default function AnimeList() {
	const { user, fetchData } = useContext(AuthContext);
	const [animelistStatus, setAnimelistStatus] = useState([]);
	const [filteredAnime, setFilteredAnime] = useState(animelistStatus ?? [""]); //TODO
	const [status, setStatus] = useState("");
	const [selectedMedia, setSelectedMedia] = useState({});
	const [noData, setNoData] = useState(false);

	const updateStatus = async (status) => {
		setStatus(status); // cambia el texto del boton
		const body = JSON.stringify({
			user_id: user.id,
			media_id: selectedMedia.media_id,
			status: status,
		});

		const response = await fetchData("status", "POST", body);
		if (response.status === 200) {
			//TODO poner alert
		}
	};

	useEffect(() => {
		if (user.username) {
			let endpoint = `library/${user.username}/animelist`;
			let method = "GET";
			fetchData(endpoint, method).then((res_animelist) => {
				if (res_animelist !== undefined) {
					setNoData(false);
					setFilteredAnime(res_animelist);
					setAnimelistStatus(res_animelist);
				} else {
					setNoData(true);
				}
			});
			// setFilteredAnime(animelistStatus);
		}
	}, [user, fetchData, status, selectedMedia]);

	const watching_list = filteredAnime.filter((media) => {
		return media.status[0].status === "WATCHING";
	});
	const rewatching_list = filteredAnime.filter((media) => {
		return media.status[0].status === "REWATCHING";
	});
	const completed_list = filteredAnime.filter((media) => {
		return media.status[0].status === "COMPLETED";
	});
	const paused_list = filteredAnime.filter((media) => {
		return media.status[0].status === "PAUSED";
	});
	const dropped_list = filteredAnime.filter((media) => {
		return media.status[0].status === "DROPPED";
	});
	const planning_list = filteredAnime.filter((media) => {
		return media.status[0].status === "PLAN TO WATCH";
	});

	return (
		<>
			{!noData ? (
				<Container>
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
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={2}
										list={"Plan to watch"}
										medias={planning_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={3}
										list={"Completed"}
										medias={completed_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={4}
										list={"Rewatching"}
										medias={rewatching_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={5}
										list={"Paused"}
										medias={paused_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
									<MediaList
										key={6}
										list={"Dropped"}
										medias={dropped_list}
										setStatus={setStatus}
										setSelectedMedia={setSelectedMedia}
									/>
								</>
							) : (
								<NoContent message={"Anime not found"}/>
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
