import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function TrendingAnime() {

  let url   = "anime/popular"
  let title = "All-Time Popular anime"


  return (
		<>
			<Head>
				<title>Popular Anime · OniList</title>
			</Head>
			<AnimePage
				url={url}
				title={title}
			/>
		</>
	);
}
