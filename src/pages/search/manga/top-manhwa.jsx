import MangaPage from "./../../../components/MangaPage/MangaPage";
import Head from "next/head";

export default function TopManhwa() {

  let url   = "manga/manhwa"
  let title = "Top Manhwa"

  return (
		<>
			<Head>
				<title>Top Mangas · OniList</title>
			</Head>
			<MangaPage
				url={url}
				title={title}
			/>
		</>
	);
}
