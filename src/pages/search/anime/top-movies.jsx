import AnimePage from "./../../../components/AnimePage/AnimePage";
import Head from "next/head";

export default function TopMovies() {

  let url   = "anime/movie"
  let title = "Top Anime Movies"


  return (
		<>
			<Head>
				<title>Top movies Anime · OniList</title>
			</Head>
			<AnimePage
				url={url}
				title={title}
			/>
		</>
	);
}
