import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ChartPie from "@/components/Graphics/Pie";
import ChartRadar from "@/components/Graphics/Radar";
import ChartLine from "@/components/Graphics/Line";
import UserStatsPages from "@/layouts/statsPage/UserStatsPages";
import NoContent from "@/components/Skeleton/NoContent";
import Head from "next/head";

export default function Manga() {
  	const { user, fetchData } = useContext(AuthContext);
		const [graphicData, setGraphicData] = useState({});

		useEffect(() => {
			if (user.username) {
				const endpoint = "library/" + user.username + "/stats/mangalist";
				fetchData(endpoint).then((res) => {
					setGraphicData(res ?? []);
					console.log(res);
				});
			}
		}, [user, fetchData]);

	return (
		<>
			<Head>
				<title>Stats manga · Onilist</title>
			</Head>
			<UserStatsPages>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5'>
					{graphicData.data_status ? (
						<>
							<div className='bg-base-300 rounded-md  p-3'>
								<p className=' text-xl mb-3'>Formats Distribution</p>
								<ChartPie
									data={graphicData.data_formats}
									labels={graphicData.labels_formats}
									label={"Formats"}
								/>
							</div>
							<div className='bg-base-300 rounded-md p-3'>
								<p className=' text-xl mb-3'>Status Distribution</p>
								<ChartPie
									data={graphicData.data_status}
									labels={graphicData.labels_status}
									label={"Status"}
								/>
							</div>
							<div className='bg-base-300 rounded-md p-3'>
								<p className=' text-xl mb-3'>Genre Distribution</p>
								<ChartRadar
									data={graphicData.data_genres}
									labels={graphicData.labels_genres}
									label={"Genre"}
								/>
							</div>
							<div className='bg-base-300 p-3 rounded-md'>
								<p className=' text-xl mb-3'>Years Distribution</p>
								<ChartLine
									data={graphicData.data_years}
									labels={graphicData.labels_years}
									label={"Manga"}
								/>
							</div>
						</>
					) : (
						<div className='bg-base-300 rounded-md p-5 col-span-1 lg:col-span-3 '>
							<NoContent message='Insufficient data' />
						</div>
					)}
				</div>
			</UserStatsPages>
		</>
	);
}
