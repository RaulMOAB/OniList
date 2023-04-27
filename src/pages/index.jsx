import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext, useState } from "react";
import ListPreview from "../components/Card/ListPreview";
import Hero from "../components/Hero/Hero";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import Search from "./../components/Filters/Search";
import Genres from "./../components/Filters/Genres";
import Year from "./../components/Filters/Year";
import Season from "./../components/Filters/Season";
import Format from "./../components/Filters/Format";
import AiringStatus from "./../components/Filters/AiringStatus";

export default function Home() {

  //TODO call API, show API response,
  const filteredMedia = async (search, genres, year, season, format, airingStatus) => {
    const response = await fetch('http://127.0.0.1:8000/api/search/anime', {
      method: "GET",
      params: {
        search: search,
        genres: genres,
        season_year: year,
        season: season,
        format: format,
        airing_status: airingStatus,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }; 

  // Filter variables
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [year, setYear] = useState("");
  const [season, setSeason] = useState("");
  const [format, setFormat] = useState("");
  const [airingStatus, setAiringStatus] = useState("");

  // Variables Handles
  const handleSearchChange = (data) => {
    setSearch(data);
  };

  const handleGenresChange = (data) => {
    setGenres(data);
  };

  const handleYearChange = (data) => {
    setYear(data);
  };

  const handleSeasonChange = (data) => {
    setSeason(data);
  };

  const handleFormatChange = (data) => {
    setFormat(data);
  };

  const handleAiringStatusChange = (data) => {
    setAiringStatus(data);
  };

  // Get media data
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
        <main className="pb-10 2xl:px-28 xl:px-16  lg:px-2 sm:px-4 px-4">
          <section id="filters">
            <div className="flex p-3 rounded-md bg-neutral my-5 bg-transparent">
              <Search  value={search} handle={handleSearchChange}/>
              <Genres  value={genres} handle={handleGenresChange}/>
              <Year  value={year} handle={handleYearChange}/>
              <Season  value={season} handle={handleSeasonChange}/>
              <Format  value={format} handle={handleFormatChange}/>
              <AiringStatus  value={airingStatus} handle={handleAiringStatusChange}/>
            </div>
          </section>
          
          <ListPreview title="Popular Animes" />
        </main>
      </Container>
    </>
  );
}
