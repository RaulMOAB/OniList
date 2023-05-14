import React from "react";
import MediaHeader from "../../components/MediaPage/MediaHeader";
import MediaBody from "../../components/MediaPage/MediaBody";
import Head from "next/head";

function AnimePage() {
  return (
    <>
    <Head><title>Anime · OniList</title></Head>
      <MediaHeader />
      <MediaBody />
    </>
  );
}

export default AnimePage;
