import React from 'react'
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import SideBar from '@/components/Navbar/SideBar';
import UserStatsPages from '@/layouts/statsPage/UserStatsPages';
import { FaPlay } from "react-icons/fa";
import {TbClockFilled} from 'react-icons/tb'
import { IoBook, IoTvSharp } from "react-icons/io5";
import {IoMdBookmarks} from 'react-icons/io'
import StatusBar from '@/components/Graphics/Bar';
import TypeMediaPie from '@/components/Graphics/Pie';
import AnimeRadar from "@/components/Graphics/Radar";
import NoContent from "@/components/Skeleton/NoContent"
import Head from "next/head";

export default function OverviewStats() {
  	const { user, fetchData } = useContext(AuthContext);
		const [graphicData, setGraphicData] = useState({});
		const [authenticated, setAuthenticated] = useState(true);



		useEffect(() => {
			if (user.username) {
				const endpoint = "library/" + user.username+"/stats";
				fetchData(endpoint).then((res) => {
					if(!res.error){
						setGraphicData(res ?? {});
					}else {
						setAuthenticated(false);
					}
				});
			}
		}, [user, fetchData]);
		if(!authenticated){return null}
  return (
		<>
			<Head>
				<title>Overview Stats · Onilist</title>
			</Head>
			<UserStatsPages>
				<div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mb-5'>
					<div className='grid grid-rows-2 grid-flow-col'>
						<div className='row-span-2 w-fit'>
							<div className='flex items-center justify-center bg-base-300 rounded-full h-12 w-12'>
								<IoTvSharp className='text-2xl'></IoTvSharp>
							</div>
						</div>
						<div className='col-span-6 text-2xl font-bold text-primary'>
							{graphicData.total_animes}
						</div>
						<div className=' col-span-6 text-xs'>Total Anime</div>
					</div>
					<div className='grid grid-rows-2 grid-flow-col'>
						<div className='row-span-2 w-fit'>
							<div className='flex items-center justify-center bg-base-300 rounded-full h-12 w-12'>
								<FaPlay className='text-2xl'></FaPlay>
							</div>
						</div>
						<div className='col-span-6 text-2xl font-bold text-primary'>
							{graphicData.total_episodes_watched}
						</div>
						<div className=' col-span-6 text-xs'>Episodes Watched</div>
					</div>
					<div className='grid grid-rows-2 grid-flow-col'>
						<div className='row-span-2 w-fit'>
							<div className='flex items-center justify-center bg-base-300 rounded-full h-12 w-12'>
								<TbClockFilled className='text-2xl'></TbClockFilled>
							</div>
						</div>
						<div className='col-span-6 text-2xl font-bold text-primary'>
							{graphicData.time_watched}
						</div>
						<div className=' col-span-6 text-xs'>Hours Watched</div>
					</div>
					<div className='grid grid-rows-2 grid-flow-col'>
						<div className='row-span-2 w-fit'>
							<div className='flex items-center justify-center bg-base-300 rounded-full h-12 w-12'>
								<IoMdBookmarks className='text-2xl'></IoMdBookmarks>
							</div>
						</div>
						<div className='col-span-6 text-2xl font-bold text-primary'>
							{graphicData.total_mangas}
						</div>
						<div className=' col-span-6 text-xs'>Total Manga</div>
					</div>
					<div className='grid grid-rows-2 grid-flow-col'>
						<div className='row-span-2 w-fit'>
							<div className='flex items-center justify-center bg-base-300 rounded-full h-12 w-12'>
								<IoBook className='text-2xl'></IoBook>
							</div>
						</div>
						<div className='col-span-6 text-2xl font-bold text-primary'>
							{graphicData.total_chapters_readed}
						</div>
						<div className=' col-span-6 text-xs'>Chapters Readed</div>
					</div>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
					{graphicData.data ? (
						<>
							<div className=' bg-base-300 rounded-md p-5 lg:col-span-3 '>
								<p className=' text-xl mb-3'>Status Distribution</p>
								<StatusBar
									labels={graphicData.labels}
									data={graphicData.data}
								/>
							</div>
							<div className='  bg-base-300 rounded-md lg:col-span-2 p-5'>
								<p className=' text-xl mb-3'>Type Distribution</p>
								<TypeMediaPie
									labels={["ANIME", "MANGA"]}
									data={[graphicData.total_animes, graphicData.total_mangas]}
								/>
							</div>
						</>
					) : (
						<>
							<div className='bg-base-300 rounded-md p-5 col-span-5 '>
								<NoContent message='Insufficient data' />
							</div>
						</>
					)}
				</div>
				{/* <AnimeRadar></AnimeRadar> */}
			</UserStatsPages>
		</>
	);
}
