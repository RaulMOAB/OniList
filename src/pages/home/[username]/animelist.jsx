import React from 'react'
import Container from '@/components/Common/PageContainer/Container';
import { useState, useEffect, useContext } from 'react';
import FilterMedia from '@/components/UserList/FilterMedia';
import MediaList from '@/components/UserList/MediaList';
import {AuthContext} from '@/contexts/AuthContext'

export default function AnimeList({ animelist_with_status }) {
	const {user, fetchData } = useContext(AuthContext);
	const [animelistStatus ,setAnimelistStatus] = useState([]);

	useEffect(()=>{
		if(user.username){
			let endpoint = `http://localhost:8000/api/library/${user.username}/animelist`
			let method = 'GET'
			fetchData(endpoint,method).then((res_animelist)=>{
				setAnimelistStatus(res_animelist);
			})
		}
	},[user,fetchData])

	const [filteredAnime, setFilteredAnime] = useState(animelistStatus);

	const watching_list = [];
	const rewatching_list = [];
	const completed_list = [];
	const paused_list = [] ;
	const dropped_list = [];
	const planning_list = [];

	



	return (
		<>
			<Container>
				<div className='grid lg:grid-cols-6 gap-4 py-6'>
					<div className=' h-96 bg-neutral'>
						<FilterMedia
							type='ANIME'
							media={animelist_with_status}
							setFilteredMedia={setFilteredAnime}
						/>
					</div>
					<div className=' col-span-5 h-96 bg-neutral'>
					</div>
				</div>
			</Container>
		</>
	);
}
