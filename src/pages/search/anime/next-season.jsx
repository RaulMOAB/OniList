import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function NextSeason() {

    const date = new Date();
    const month = date.getMonth() + 1;
    let nextSeason = '';

    if (month >= 3 && month <= 5) {
    nextSeason = 'summer';
    } else if (month >= 6 && month <= 8) {
    nextSeason = 'autumn';
    } else if (month >= 9 && month <= 11) {
    nextSeason = 'winter';
    } else {
    nextSeason = 'spring';
    }
    const year = date.getFullYear();


    let url   = "anime/upcoming"
    let title = `Anime next season - Airing ${nextSeason} ${year}`


    return (
			<>
				<Head>
					<title>Next season Anime · OniList</title>
				</Head>
				<AnimePage
					url={url}
					title={title}
				/>
			</>
		);
}
