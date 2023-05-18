import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Container from "./../Common/PageContainer/Container";
import DubberedCard from "../Card/DubberedCard";
import MediaCard from "../Card/MediaCard";

// Poner en las medias en las que ha trabajado si es staff normal (diferenciar entre manga y anime)
// Poner en que personajes ha trabajado y en que año si aparece


/**
 * Pasos:
 * 1 - Mirar si el personaje tiene personajes a los que ha doblado
 * 2 - Si tiene tratarlo como doblador y poner los personajes a los que ha doblador
 * 3 - Si no tratarlo como trabajador y poner las medias en las que ha trabajado
 */


const getPersonDubCharacter = async (id) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `staff/dub/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
};

const getCharacter = async (character_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `characters/${character_id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

const getPersonWorksIn = async (id) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `staff/worksin/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
};

const getMedia = async (id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `media/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export default function StaffBody() {

    const router = useRouter();
    const { id } = router.query;
    const [characters, setCharacters] = useState([])
    const [mediaAnime, setMediaAnime] = useState([])
    const [mediaManga, setMediaManga] = useState([])
    const [dubber, setDubber] = useState(true);
    let character;
    let medias;
  

    useEffect(() => {
        if (id) {
          getPersonDubCharacter(id)
            .then((res) => {
              //console.log(res)
              character = res.characters ?? '';
              console.log(character.length);

              if(character.length != 0)
              {
                console.log(character)

                setDubber(true);

                character.forEach((character, index) => {
                  setCharacters(characters => [...characters, character])
                });

              //   for (let i = 0; i < character.length; i++) {
                  
              //     getCharacter(character[i].character_id)
              //     .then((response) => {
              //         //console.log(response[0]);
              //         setCharacters(characters => [...characters, response[0]])
              //     })
              //   }
              }
              else
              {
                getPersonWorksIn(id)
                .then((res) => {

                  console.log(res)
                  medias = res ?? '';

                  setDubber(false);

                  medias.forEach((media, index) => {
                    if(media.type == 'ANIME'){
                      setMediaAnime(mediaAnime => [...mediaAnime, media])
                    }
                    else if(media.type == 'MANGA'){
                      setMediaManga(mediaManga => [...mediaManga, media])
                    }
                  });

                  // for (let i = 0; i < medias.length; i++) {
                  //   getMedia(medias[i].media_id)
                  //   .then((response) => {
                  //     if(response.type == 'ANIME'){
                  //       setMediaAnime(mediaAnime => [...mediaAnime, response])
                  //     }
                  //     else if(response.type == 'MANGA'){
                  //       setMediaManga(mediaManga => [...mediaManga, response])
                  //     }
                      
                  //   })
                  // }

                  
                })
              }

            })
            .catch((e) => {
              console.log(e);
            });
        }


    }, [id]);

    return(
        <>
            <Container>
                <main className="pb-16 lg:pt-16 pt-10 2xl:px-28 xl:px-16  lg:px-2 sm:px-4 px-4">
                  {
                    dubber 
                      ? <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                          {characters.map((media, i) => {
                              return (
                                  <DubberedCard
                                      key={i}
                                      character={media}
                                      index={i}
                                  />
                              );
                          })}
                        </div>
                      : <div>
                          {mediaAnime.length != 0
                            ? <div>
                                <h4 className="text-accent font-semibold pb-5">ANIME STAFF ROLES</h4>
                                <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                                  {mediaAnime.map((media, i) => {
                                    return (
                                        <MediaCard
                                            key={i}
                                            media={media}
                                            index={i}
                                        />
                                    );
                                  })}
                                </div>
                              </div>
                            : ''
                          }
                          
                          {mediaManga.length != 0
                            ? <div>
                                <h4 className="text-accent font-semibold pb-5 pt-12">MANGA STAFF ROLES</h4>
                                <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                                  {mediaManga.map((media, i) => {
                                    return (
                                        <MediaCard
                                            key={i}
                                            media={media}
                                            index={i}
                                        />
                                    );
                                  })}
                                </div>
                              </div>
                            : ''
                          }
                        </div>
                  }
                </main>
            </Container>
        </>
       
    )
}