import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";
import Container from "@/components/Common/PageContainer/Container";
import MediaPageCard from "@/components/Card/MediaPageCard";
import ReadMore from './../utils/ReadMore'
import Head from "next/head";

// API petition
const getCharacter = async (id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `characters/${id}`,
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


function CharacterHeader() {

  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState({})


  useEffect(() => {
    if (id) {
      getCharacter(id)
        .then((res) => {
          console.log(res[0])
          setCharacter(res[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  return(
    <>
      <Head>
				<title>{character.romaji} · OniList</title>
			</Head>
      <div
          className={"hero opacity-80 bg-neutral " + style.banner_character}
      >
        <div className={style.banner_shadow}></div>
      </div>
      <Container>
      <div className="grid grid-cols-6 gap-8 md:grid-flow-col xl:px-52">
          <div className="mx-auto lg:col-span-2 md:col-span-3 col-span-6 -mt-28 z-30 w-fit md:pl-12 xl:pl-0">
            <MediaPageCard img={character.image_large} />
          </div>
          <div className="md:py-10 lg:col-span-4 md:col-span-3 col-span-6 2xl:-ml-10 md:-ml-6 lg:-ml-0 md:pl-0 pl-5 text-left z-30">
            <h2 className="2xl:text-3xl md:text-xl text-2xl font-bold md:-mt-32 text-accent">{character.romaji}</h2>
            <h3 className="text-md mt-1 md:mb-12 mb-6 text-accent">{character.name}</h3>
            {
              character.age != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Age:</span> {character.age} 
                </p> : ""
            }
            {
              character.gender != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Gender:</span> {character.gender} 
                </p> : ""
            }
            {
              character.birthday != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Birthday:</span> {character.birthday} 
                </p> : ""
            }
            {
              character.blood_type != null ? <p className="text-sm">
                  <span className="font-semibold text-accent">Blood Type:</span> {character.blood_type} 
                </p> : ""
            }
            <div className={"mt-3 2xl:text-sm md:text-sm " + style.description}>
            {
              character.description != null ? <div className="text-sm">
                  <ReadMore>
                    {character.description}
                  </ReadMore> 
                </div> : ""
            }
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
export default CharacterHeader;