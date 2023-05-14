import React from "react";
import MediaHeader from "../../components/MediaPage/MediaHeader";
import MediaBody from "../../components/MediaPage/MediaBody";
import Head from "next/head";
function MangaPage() {
  return (
		<>
			<Head>
				<title>Manga · OniList</title>
			</Head>
			<MediaHeader />
			<MediaBody />
		</>
	);
}

export default MangaPage;
