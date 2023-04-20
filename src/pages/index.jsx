import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import MediaCard from "../components/Card/MediaCard";
import Hero from "../components/Hero/Hero";
import LoadingCloud from "@/components/Loading/LoadingCloud";

export default function Home() {
	let data = useContext(MediaContext);
	let media_data = [];

	data.map((item, i) => {
		if (i < 5) {
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
				<meta
					name='description'
					content='Build your own anime and manga library'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
					integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
					crossorigin='anonymous'
					referrerpolicy='no-referrer'
				/>
			</Head>
			<header>
				<Hero media={media_data} />
			</header>

			<main className='mx-40 mb-20'>
				<h1 className='xl:text-2xl uppercase my-10'>Popular animes</h1>
				{
					<div className='grid grid-cols-5 gap-10 '>
						{media_data.map((media, i) => {
							return (
								<MediaCard
									key={i}
									media={media}
								/>
							);
						})}
					</div>
				}
			</main>
		</>
	);
}
