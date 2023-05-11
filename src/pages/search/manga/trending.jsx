import Head from "next/head";
import { useContext, useState, useEffect} from "react";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import Search from "./../../../components/Filters/Search";
import Genres from "./../../../components/Filters/Genres";
import AiringStatus from "./../../../components/Filters/AiringStatus";
import MediaCard from "./../../../components/Card/MediaCard";
import Loader from "./../../../components/Skeleton/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ResetButton from "./../../../components/Buttons/ResetButton";

//API Petition
const filteredMediaManga = async (search, genres, airing_status, type = 'MANGA') => {
    const body = JSON.stringify({
      type,
      search,
      genres,
      airing_status,
    });
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'search/manga', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    return response.json();
};


export default function TrendingManga() {

  // Filter variables
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState('');
  const [airing_status, setAiringStatus] = useState('');
  const [showFiltered, setShowFiltered] = useState(true);
  const [mediaComponents, setMediaComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingManga, setTrendingManga] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Get medias
  const getTrendingManga = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+`manga/trending?page=${pageNumber}`);
      return response.json();   
  };

  // initials mangas
  useEffect(() => {
    getTrendingManga()
      .then((res) => {
        
        let medias = res.data.data;
        console.log(res.data.data);
        medias.forEach((media,index) => {
            setTrendingManga(trendingManga => [...trendingManga, media])
        })
      })
      .catch((e) => {
        console.log(e.message);
      });

  }, []);
  
  // Change page number and get medias in Infinite Scroll
  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    getTrendingManga()
      .then((res) => {
        
        let medias = res.data.data;
        medias.forEach((media,index) => {
            setTrendingManga(trendingManga => [...trendingManga, media])
        })
      })
      .catch((e) => {
        console.log(e.message);
      });
  }


  //useEffect, call function every time dependencies change
  useEffect(() => {

    handleClick();

  },[search, genres, airing_status]);

  // skeleton loading time
  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    },650);

  },[search, genres, airing_status]);


  // Variables Handles
  const handleSearchChange = (data) => {
    setSearch(data);
  };

  const handleGenresChange = (data) => {
    setGenres(data);
  };

  const handleAiringStatusChange = (data) => {
    setAiringStatus(data);
  };

  function emptyFields() {
    if(search == "" && genres == "" && airing_status == "") 
    {
      return true;
    }

    return false;
  }

  //reset filter
  function resetFilter(){
    setSearch("");
    setGenres("");
    setAiringStatus("");
    handleClick();
  }

  // call filtered medias every time variable change
  function handleClick() {
    console.log(search + "  " + genres + "  " + airing_status);

    filteredMediaManga(search, genres, airing_status)
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
  let data = trendingManga;

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
            <h1 className="text-accent font-semibold ml-3 text-2xl mt-10">Trending Manga</h1>
          <section id="filters">
            <div className="flex flex-wrap p-3 rounded-md bg-neutral mt-5 bg-transparent">
              <Search value={search} handle={handleSearchChange}/>
              <Genres value={genres} handle={handleGenresChange}/>
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
                    dataLength={trendingManga.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h3> Loading...</h3>}
                    endMessage={<h4>Nothing more to show</h4>}
                >

                    <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                        {trendingManga.map((media, i) => {
                            return (
                                <MediaCard
                                    key={i}
                                    media={media}
                                    index={i}
                                    type="manga"
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
                          return <MediaCard key={index} media={media} index={index} type="manga"/>
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
