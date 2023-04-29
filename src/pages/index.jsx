import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext, useState, useEffect} from "react";
import { GrPowerReset } from "react-icons/gr";
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
import MediaCard from "./../components/Card/MediaCard";

//API Petition
const filteredMedia = async (search, genres, season_year, season, format, airing_status) => {
  const body = JSON.stringify({
    search,
    genres,
    season_year,
    season,
    format,
    airing_status,
  });
  const response = await fetch('http://127.0.0.1:8000/api/search/anime', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body,
  });
  return response.json();
};


export default function Home() {

  // Filter variables
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState('');
  const [season_year, setYear] = useState('');
  const [season, setSeason] = useState('');
  const [format, setFormat] = useState('');
  const [airing_status, setAiringStatus] = useState('');
  const [showFiltered, setShowFiltered] = useState(true);
  const [mediaComponents, setMediaComponents] = useState([]);

  //useEffect, call function every time dependencies change
  useEffect(() => {

    handleClick();

  },[search, genres, season_year, season, format, airing_status]);

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

  function emptyFields() {
    if(search == "" && genres == "" && season_year == "" &&
      season == "" && format == "" && airing_status == "") 
    {
      return true;
    }

    return false;
  }

  function resetFilter(){
    setSearch("");
    setGenres("");
    setYear("");
    setSeason("");
    setFormat("");
    setAiringStatus("");
    handleClick();
  }

  function handleClick() {
    console.log(search + "  " + genres + "  " + season_year + " " + season + " " + format + " " + airing_status);

    filteredMedia(search, genres, season_year, season, format, airing_status)
      .then((res) => {
        if (res.status === "success" && res.media_length > 0) {
          setMediaComponents([]);
          console.log(res.media_length);
          console.log(res.data.data);
          setShowFiltered(emptyFields());

          const medias = res.data.data;
          medias.forEach((media,index) => {
            setMediaComponents(mediaComponents => [...mediaComponents, media])
          })
        }
        else{
          setMediaComponents([]);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
    
  }

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
            <div className="flex flex-wrap p-3 rounded-md bg-neutral mt-5 bg-transparent">
              <Search value={search} handle={handleSearchChange}/>
              <Genres value={genres} handle={handleGenresChange}/>
              <Year value={season_year} handle={handleYearChange}/>
              <Season value={season} handle={handleSeasonChange}/>
              <Format value={format} handle={handleFormatChange}/>
              <AiringStatus value={airing_status} handle={handleAiringStatusChange}/>
            </div>
            <div className="ml-3 mb-6">
              <button 
                className="bg-green-600 hover:bg-green-900 btn-sm rounded-md p-1"
                onClick={resetFilter}
              >
                <GrPowerReset className="text-lg inline-block"/>
                <span className="align-middle text-sm text-black ml-1">Reset</span>
              </button>
            </div>
          </section>
          <div>
            {showFiltered ? (

              <ListPreview title="Popular Animes" />

            ) : ( 
              
              
              mediaComponents.length == 0 ? (

                <div className="mb-14">
                  <h2 className="text-center text-accent text-2xl">No Results</h2>
                </div>

                ) : (
                  <div className="animate-fade grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6">
                    {
                      mediaComponents.map((media, index) => {
                        return <MediaCard key={index} media={media} index={index}/>
                      })
                    }
                  </div>
                )            
            )}
            
          </div>
          
        </main>
      </Container>
    </>
  );
}
