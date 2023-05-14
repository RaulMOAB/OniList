import MangaPage from "./../../../components/MangaPage/MangaPage";
import Head from "next/head";

export default function TopManga() {

  let url   = "manga/top"
  let title = "Top 100 Manga"

  return (
		<>
			<Head>
				<title>Top 100 Manga · OniList</title>
			</Head>
			<MangaPage
				url={url}
				title={title}
			/>
		</>
	);
}
