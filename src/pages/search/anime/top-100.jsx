import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function TopAnime() {

  let url   = "anime/top"
  let title = "Top 100 Anime"
  
  return (
		<>
			<Head>
				<title>Top 100 Anime · OniList</title>
			</Head>
			<AnimePage
				url={url}
				title={title}
			/>
		</>
	);
}
