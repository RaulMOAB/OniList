import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import MediaCard from "../components/Card/MediaCard";
import Hero from "../components/Hero/Hero";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";

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
    <Container>
			<main className="pb-10 2xl:px-28  xl:px-16  lg:px-2 sm:px-4 px-4">
				<div className='p-3 rounded-md bg-slate-700 my-5'>
					<p className='text-center text-white'>Filters</p>
				</div>
				<div className=''>
					<h1 className='xl:text-lg uppercase font-bold mb-2'>
						Popular animes
					</h1>
				</div>
				{
					<div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
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
			</main>
    </Container>
		</>
	);
}
