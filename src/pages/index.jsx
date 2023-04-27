import Head from "next/head";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext, useState, useEffect} from "react";
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
  //setMedia(response.json());
  //console.log(response.json());
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
  // const [media, setMedia] = useState({});
  let medias = [];
  let mediaComponents = [];
  

  //TODO call API, show API response,
   

  // Variables Handles
  const handleSearchChange = (data) => {
    setSearch(data);
    onSubmit();
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

  const onSubmit = () =>{
    console.log(search + "  " + genres + "  " + season_year + " " + season + " " + format + " " + airing_status);

    filteredMedia(search, genres, season_year, season, format, airing_status)
      .then((res) => {
        medias = res.data.data;
        // medias.forEach((media,index) => {
        //   console.log(media);
        //   mediaComponents.push(
        //     <MediaCard
        //     key={index}
        //     media={media}
        //     index={index}
        //     />
        //   )

          
        // });  
        console.log(medias);
      })
      .catch((error) => {
				console.error("Error al enviar el formulario:", error);
			});

    // console.log("***************ESTO ES LA FUNCION*****************")
    // filteredMedia(search, genres, season_year, season, format, airing_status).then((filtered_media)=>{
    //   console.log(filtered_media)
    //   setMedia(filtered_media);
    // });
    // console.log("***************ESTO ES LA MEDIA*****************")
    // console.log(media)
  }

  const handleFormatChange = (data) => {
    setFormat(data);
    // let filtered_media = filteredMedia(search, genres, season_year, season, format, airing_status);
    // setMedia(filtered_media);
    // console.log(filtered_media);
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
              <Search value={search} handle={handleSearchChange}/>
              <Genres value={genres} handle={handleGenresChange}/>
              <Year value={season_year} handle={handleYearChange}/>
              <Season value={season} handle={handleSeasonChange}/>
              <Format value={format} handle={handleFormatChange}/>
              <AiringStatus value={airing_status} handle={handleAiringStatusChange}/>
            </div>
          </section>
          {/* <button 
            onClick={ () => {
              onSubmit()
            }}
              // handleClick();
              // let filtered_media = filteredMedia(search, genres, season_year, season, format, airing_status);
              // setMedia(filtered_media);
              // console.log('### Resultado ###');
            
          >
            Filtrar
          </button> */}
          <div>
            Hola
          </div>
          <ListPreview title="Popular Animes" />
        </main>
      </Container>
    </>
  );
}
