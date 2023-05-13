import Head from "next/head";
import { useContext, useState, useEffect} from "react";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import Search from "./../Filters/Search";
import Genres from "./../Filters/Genres";
import Year from "./../Filters/Year";
import Season from "./../Filters/Season";
import Format from "./../Filters/Format";
import AiringStatus from "./../Filters/AiringStatus";
import MediaCard from "./../Card/MediaCard";
import Loader from "./../Skeleton/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ResetButton from "./../Buttons/ResetButton";

//API Petition
const filteredMediaAnime = async (search, genres, season_year, season, format, airing_status, type = 'ANIME') => {
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


export default function AnimePage({url, title}) {

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
  const [anime, setAnime] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Get medias
  const getAnime = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`${url}?page=${pageNumber}`);
      return response.json();   
  };

  // initials animes
  useEffect(() => {
    getAnime()
      .then((res) => {
        
        let medias = res.data.data;
        medias.forEach((media,index) => {
            setAnime(anime => [...anime, media])
        })
      })
      .catch((e) => {
        console.log(e.message);
      });

  }, []);
  
  // Change page number and get medias in Infinite Scroll
  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    getAnime()
      .then((res) => {
        
        let medias = res.data.data;
        medias.forEach((media,index) => {
            setAnime(anime => [...anime, media])
        })
      })
      .catch((e) => {
        console.log(e.message);
      });
  }


  //useEffect, call function every time dependencies change
  useEffect(() => {

    handleClick();

  },[search, genres, season_year, season, format, airing_status]);

  // skeleton loading time
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

  const handleFormatChange = (data) => {
    setFormat(data);
  };

  const handleAiringStatusChange = (data) => {
    setAiringStatus(data);
  };

  function emptyFields() {
    if(search == "" && genres == "" && season_year == "" &&
      season == "" && format == "" && airing_status == "") 
    {
      return true;
    }

    return false;
  }

  //reset filter
  function resetFilter(){
    setSearch("");
    setGenres("");
    setYear("");
    setSeason("");
    setFormat("");
    setAiringStatus("");
    handleClick();
  }

  // call filtered medias every time variable change
  function handleClick() {
    console.log(search + "  " + genres + "  " + season_year + " " + season + " " + format + " " + airing_status);

    filteredMediaAnime(search, genres, season_year, season, format, airing_status)
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
  
  // Get media data
  let data = anime;

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
            <h1 className="text-accent font-semibold ml-3 text-2xl mt-10">{title}</h1>
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
              <ResetButton text="Reset" reset={resetFilter}/>
            </div>
          </section>
          
          <div>
            {showFiltered ? (
              <div>
                
                <InfiniteScroll
                    dataLength={anime.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h3> Loading...</h3>}
                    endMessage={<h4>Nothing more to show</h4>}
                >

                    <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                        {anime.map((media, i) => {
                            return (
                                <MediaCard
                                    key={i}
                                    media={media}
                                    index={i}
                                />
                            );
                        })}
                    </div>

                </InfiniteScroll>
                
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
                          return <Loader key={index} media={media} index={index}/> 
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
