import Head from "next/head";
import { useContext, useState, useEffect} from "react";
import ListPreview from "./../Card/ListPreview";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import Search from "./../Filters/Search";
import Genres from "./../Filters/Genres";
import AiringStatus from "./../Filters/AiringStatus";
import FormatManga from "./../Filters/FormatManga";
import Tags from "./../Filters/Tags";
import MediaCard from "./../Card/MediaCard";
import Loader from "./../Skeleton/Loader";
import ResetButton from "./../Buttons/ResetButton";

//Get medias
const getTrendingManga = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'manga/trending');
  return response.json();
};

const getPopularManga = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'manga/popular');
  return response.json();
};

const getManhwaManga = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'manga/manhwa');
  return response.json();
};

//API Petition
const filteredMediaManga = async (search, genres, airing_status, tags, format, type = 'MANGA') => {
  const body = JSON.stringify({
    type,
    search,
    genres,
    airing_status,
    tags,
    format,
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


export default function MainMangaPage() {

  // Filter variables
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState('');
  const [airing_status, setAiringStatus] = useState('');
  const [tags, setTags] = useState('');
  const [format, setFormat] = useState('');
  const [showFiltered, setShowFiltered] = useState(true);
  const [mediaComponents, setMediaComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularManga, setPopularManga] = useState([]);
  const [trendingManga, setTrendingManga] = useState([]);
  const [manhwaManga, setManhwaManga] = useState([]);

  // initials animes
  useEffect(() => {
    getTrendingManga()
      .then((res) => {
        
        let medias = res.data.data;
        medias.forEach((media,index) => {
            setTrendingManga(trendingManga => [...trendingManga, media])
        })
        //setTrendingAnime(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getPopularManga()
    .then((res) => {
      console.log("Popular Animes")
      let medias = res.data.data;
      console.log(res.data)
      medias.forEach((media,index) => {
        setPopularManga(popularManga => [...popularManga, media])
      })
    })
    .catch((e) => {
      console.log(e.message);
    });

    getManhwaManga()
    .then((res) => {
      let medias = res.data.data;
      medias.forEach((media,index) => {
        setManhwaManga(manhwaManga => [...manhwaManga, media])
      })
    })
    .catch((e) => {
      console.log(e.message);
    });
  }, []);


  //useEffect, call function every time dependencies change
  useEffect(() => {

    handleClick();

  },[search, genres, airing_status, tags, format]);

  // skeleton loading time
  // useEffect(() => {

  //   setTimeout(() => {
  //     setLoading(false);
  //   },650);

  // },[search, genres, airing_status, tags, format]);


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

  const handleTagsChange = (data) => {
    setTags(data);
  };

  const handleFormatChange = (data) => {
    setFormat(data);
  };

  function emptyFields() {
    if(search == "" && genres == "" && airing_status == "" && tags == "" && format == "") 
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
    setTags("");
    setFormat("");
    handleClick();
  }

  // call filtered medias every time variable change
  function handleClick() {
    //console.log(search + "  " + genres + "  " + season_year + " " + season + " " + format + " " + airing_status);

    filteredMediaManga(search, genres, airing_status, tags, format)
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

          // skeleton loading time
          setTimeout(() => {
            setLoading(false);
          },650);
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
  let data = popularManga;

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
              <AiringStatus value={airing_status} handle={handleAiringStatusChange}/>
              <Tags value={tags} handle={handleTagsChange}/>
              <FormatManga value={format} handle={handleFormatChange}/>
            </div>
            <div className="ml-3 mb-6">
              <ResetButton text="Reset" reset={resetFilter}/>
            </div>
          </section>
          <div>
            {showFiltered ? (
              <div>
                
                <ListPreview title="Trending Now" data={trendingManga} type="manga" route={"/search/manga/trending"}/>
            
                <ListPreview title="All time popular" data={popularManga} type="manga" route={"/search/manga/top-100"}/>
            
                <ListPreview title="Popular manhwa" data={manhwaManga} type="manga" route={"/search/manga/top-manhwa"}/>
                
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
                          return <MediaCard key={index} media={media} index={index} />
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
