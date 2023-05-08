import Head from "next/head";
import { useContext, useState, useEffect} from "react";
import { GrPowerReset } from "react-icons/gr";
import ListPreview from "../../components/Card/ListPreview";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import Search from "./../../components/Filters/Search";
import Genres from "./../../components/Filters/Genres";
import Year from "./../../components/Filters/Year";
import Season from "./../../components/Filters/Season";
import Format from "./../../components/Filters/Format";
import AiringStatus from "./../../components/Filters/AiringStatus";
import MediaCard from "./../../components/Card/MediaCard";
import Loader from "./../../components/Skeleton/Loader";

//Get medias
const getTrendingAnime = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'trending/anime');
  return response.json();
};

const getPopularAnime = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'anime');
  return response.json();
};

const getUpcomingAnime = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'upcoming/anime');
  return response.json();
};

//API Petition
const filteredMedia = async (search, genres, season_year, season, format, airing_status, type = 'ANIME') => {
  const body = JSON.stringify({
    type,
    search,
    genres,
    season_year,
    season,
    format,
    airing_status,
  });
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'search/anime', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body,
  });
  return response.json();
};


export default function Anime() {

  // Filter variables
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState('');
  const [season_year, setYear] = useState('');
  const [season, setSeason] = useState('');
  const [format, setFormat] = useState('');
  const [airing_status, setAiringStatus] = useState('');
  const [showFiltered, setShowFiltered] = useState(true);
  const [mediaComponents, setMediaComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularAnime, setPopularAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);


  useEffect(() => {
    getTrendingAnime()
      .then((res) => {
        
        let medias = res.data.data;
        medias.forEach((media,index) => {
          setTrendingAnime(trendingAnime => [...trendingAnime, media])
        })
        //setTrendingAnime(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getPopularAnime()
    .then((res) => {
      console.log("Popular Animes")
      let medias = res.data.data;
      console.log(medias)
      medias.forEach((media,index) => {
        setPopularAnime(popularAnime => [...popularAnime, media])
      })
    })
    .catch((e) => {
      console.log(e.message);
    });

    getUpcomingAnime()
    .then((res) => {
      let medias = res.data.data;
      medias.forEach((media,index) => {
        setUpcomingAnime(upcomingAnime => [...upcomingAnime, media])
      })
    })
    .catch((e) => {
      console.log(e.message);
    });
  }, []);








  //useEffect, call function every time dependencies change
  useEffect(() => {

    // setLoading(true);
    handleClick();

  },[search, genres, season_year, season, format, airing_status]);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    },650);

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
          setLoading(true);
        }
        else{
          setMediaComponents([]);
          setShowFiltered(emptyFields());
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

  let data = upcomingAnime;

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
              <div>
                
                <ListPreview title="Trending Now" data={trendingAnime} />
            
                <ListPreview title="Popular this season" data={popularAnime} />
            
                <ListPreview title="Upcoming next season" data={upcomingAnime} />

                <ListPreview title="All time popular" data={popularAnime} />
                
              </div>

            ) : ( 
              
              
              mediaComponents.length == 0 ? (

                <div className="mb-14">
                  <h2 className="text-center text-accent text-2xl">No Results</h2>
                </div>

                ) : (

                  loading == true ? (

                    
                    <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6">
                      {
                        mediaComponents.map((media, index) => {
                          return <Loader key={index} media={media} index={index}/> //https://codesandbox.io/s/react-fadein-out-transition-component-eww6j?file=/src/index.js:517-554
                        })
                      }
                    </div>
                    
                  ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6">
                      {
                        mediaComponents.map((media, index) => {
                          return <MediaCard key={index} media={media} index={index}/>
                        })
                      }
                    </div>
                  )
                )            
            )}
            
          </div>
          
        </main>
      </Container>
    </>
  );
}
