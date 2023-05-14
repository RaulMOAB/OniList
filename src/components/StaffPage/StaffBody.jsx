import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MediaCard from "./../Card/MediaCard";
import Container from "./../Common/PageContainer/Container";

// Poner en las medias en las que ha trabajado si es staff normal (diferenciar entre manga y anime)
// Poner en que personajes ha trabajado y en que año si aparece


const getCharacterAppearsIn = async (character_id) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `characters/appears/${character_id}`,
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

const getMediaInCharacterAppears = async (id) => {
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

export default function CharacterBody() {

    const router = useRouter();
    const { id } = router.query;
    const [media, setMedia] = useState([])


    useEffect(() => {
        if (id) {
            getCharacterAppearsIn(id)
            .then((res) => {
              console.log(res)
              for (let i = 0; i < res.length; i++) {
                
                getMediaInCharacterAppears(res[i].media_id)
                .then((response) => {
                    console.log(response);
                    setMedia(media => [...media, response])
                })
              }
              //setCharacterAppearIn(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }

        //console.log(characterAppearIn)



    }, [id]);

    return(
        <>
            {/* <Container>
                <main className="pb-16 lg:pt-16 pt-10 2xl:px-28 xl:px-16  lg:px-2 sm:px-4 px-4">
                    <div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
                        {media.map((media, i) => {
                            return (
                                <MediaCard
                                    key={i}
                                    media={media}
                                    index={i}
                                />
                            );
                        })}
                    </div>
                </main>
            </Container> */}
            
        </>
       
    )
}