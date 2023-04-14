import Head from "next/head";
import Image from "next/image";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";

export default function Home() {
  const media = useContext(MediaContext);
  return (
    <>
      <Head>
        <title>OniList</title>
        <meta
          name="description"
          content="Build your own anime and manga library"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {media}
    </>
  );
}
