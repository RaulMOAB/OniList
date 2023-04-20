import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import MediaCard from "../components/Card/MediaCard";
import Hero from "../components/Hero/Hero";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Main from "@/components/Common/Main/Main";

export default function Home() {
	let data = useContext(MediaContext);
	let media_data = [];

	data.map((item, i) => {
		if (i < 6) {
			media_data.push(item);
		}
		return media_data;
	});
	console.log(media_data);

	if (data.length === 0) {
		return (
			<>
				<LoadingCloud />
			</>
		);
	}
	return (
		<>
			<Head>
				<title>OniList</title>
			</Head>
			<header>
				<Hero media={media_data} />
			</header>

			<Main>
				<div className='p-3 rounded-md bg-slate-700 my-5'>
					<p className='text-center text-white'>Filters</p>
				</div>
				<div className=''>
					<h1 className='xl:text-lg uppercase font-bold mb-2'>
						Popular animes
					</h1>
				</div>
				{
					<div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-2 '>
						{media_data.map((media, i) => {
							return (
								<MediaCard
									key={i}
									media={media}
									index ={i}
								/>
							);
						})}
					</div>
				}
			</Main>
		</>
	);
}
