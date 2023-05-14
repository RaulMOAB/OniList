import React from "react";
import CharacterHeader from "./../../../components/CharacterPage/CharacterHeader";
import CharacterBody from "./../../../components/CharacterPage/CharacterBody";
import Head from "next/head";
function CharacterPage() {
    return (
			<>
				<Head>
					<title>Character · OniList</title>
				</Head>
				<CharacterHeader />
				<CharacterBody />
			</>
		);
}
export default CharacterPage;
  