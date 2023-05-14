import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function ThisSeason() {

    const date = new Date();
    const month = date.getMonth() + 1;
    let season = '';

    if (month >= 3 && month <= 5) {
        season = 'Spring';
    } else if (month >= 6 && month <= 8) {
        season = 'Summer';
    } else if (month >= 9 && month <= 11) {
        season = 'Autumn';
    } else {
        season = 'Winter';
    }
    const year = date.getFullYear();


    let url   = "anime/this-season"
    let title = `${season} ${year} Anime`


    return (
			<>
				<Head>
					<title>This season Anime season Anime · OniList</title>
				</Head>
				<AnimePage
					url={url}
					title={title}
				/>
			</>
		);
}
