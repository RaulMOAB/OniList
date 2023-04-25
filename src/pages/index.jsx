import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import ListPreview from "../components/Card/ListPreview";
import Hero from "../components/Hero/Hero";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";

export default function Home() {
  let data = useContext(MediaContext);
  let media_data = [];

  data.map((item, i) => {
    if (i < 6) {
      media_data.push(item);
    }
    return media_data;
  });
  //   console.log(media_data);

  if (data.length === 0) {
    return (
      <>
        <LoadingCloud />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>OniList</title>
      </Head>
      <header>
        <Hero media={media_data} />
      </header>
      <Container>
        <main className="pb-10 2xl:px-28  xl:px-16  lg:px-2 sm:px-4 px-4">
          <div className="p-3 rounded-md bg-neutral my-5">
            <p className="text-center text-accent">Filters</p>
          </div>
          <ListPreview title="Popular Animes" />
        </main>
      </Container>
    </>
  );
}
