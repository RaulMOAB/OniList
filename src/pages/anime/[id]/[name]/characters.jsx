import React from "react";
import MediaHeader from "../../../../components/MediaPage/MediaHeader";
import MediaBodyCharacters from "../../../../components/MediaPage/MediaBodyCharacters";
import Head from "next/head";

function CharactersPage() {
  return (
    <>
    <Head><title>Characters · OniList</title></Head>
      <MediaHeader />
      <MediaBodyCharacters />
    </>
  );
}

export default CharactersPage;
