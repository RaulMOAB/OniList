import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function TrendingAnime() {

  let url   = "anime/trending"
  let title = "Trending Anime"


  return (
		<>
			<Head>
				<title>Trending Anime · OniList</title>
			</Head>
			<AnimePage
				url={url}
				title={title}
			/>
		</>
	);
}
