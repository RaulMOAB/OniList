import MainMangaPage from "./../../components/MangaPage/MainMangaPage";
import Head from "next/head";

export default function Manga() {

  
  return (
		<>
			<Head>
				<title>Mangas · OniList</title>
			</Head>
			<MainMangaPage />
		</>
	);
}
