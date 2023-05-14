import MangaPage from "./../../../components/MangaPage/MangaPage";
import Head from "next/head";

export default function TopManhwa() {

  let url   = "manga/trending"
  let title = "Trending Manga"

  return (
		<>
			<Head>
				<title>Trending Manga · OniList</title>
			</Head>
			<MangaPage
				url={url}
				title={title}
			/>
		</>
	);
}
