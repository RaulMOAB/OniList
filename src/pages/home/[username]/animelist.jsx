import React from 'react'
import Container from '@/components/Common/PageContainer/Container';
import { useState, useEffect, useContext } from 'react';
import FilterMedia from '@/components/UserList/FilterMedia';
import MediaList from '@/components/UserList/MediaList';
import FavoritesCards from "@/components/Card/FavoritesCards";
import {AuthContext} from '@/contexts/AuthContext'

export default function AnimeList({ animelist_with_status }) {
	const {user, fetchData } = useContext(AuthContext);
	const [animelistStatus ,setAnimelistStatus] = useState([]);
	const [filteredAnime, setFilteredAnime] = useState(animelistStatus);//TODO
	useEffect(()=>{
		if(user.username){
			let endpoint = `library/${user.username}/animelist`
			let method = 'GET'
			fetchData(endpoint,method).then((res_animelist)=>{
				setAnimelistStatus(res_animelist);
			})
			// setFilteredAnime(animelistStatus);
		}
	},[user,fetchData])





	const watching_list = [];
	const rewatching_list = [];
	const completed_list = [];
	const paused_list = [] ;
	const dropped_list = [];
	const planning_list = [];
	let favoriteAnimes = [];

	filteredAnime.forEach((media_info, index) => {
		favoriteAnimes.push(
			<FavoritesCards
				key={index}
				type={"anime"}
				media_id={media_info.media.media_id}
				image={media_info.media.extra_large_cover_image}
				title={media_info.media.title}
			/>
		);
	});
	console.log(filteredAnime)
	



	return (
		<>
			<Container>
				<div className='grid lg:grid-cols-6 gap-4 py-6'>
					<div className=' h-96 bg-neutral'>
						<FilterMedia
							type='ANIME'
							medias={animelistStatus}
							setFilteredMedia={setFilteredAnime}
						/>
					</div>
					<div className=' col-span-5 grid-cols-6 h-96 bg-neutral'>
						{favoriteAnimes}
					</div>
				</div>
			</Container>
		</>
	);
}
