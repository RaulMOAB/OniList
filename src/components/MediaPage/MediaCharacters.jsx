import React from "react";
import CharacterCard from "../Card/CharacterCard";
import Link from "next/link";

function MediaCharacters({ characters, dubbers, role }) {
  //console.log(dubbers)
  if (characters.length !== 0) {
    let characterCards = [];
    characters.forEach((element, index) => {
      if (index < 6) {
        //num of cards  
        characterCards.push(
          <CharacterCard
            character={element.character_data}
            role={role[index]}
            dubber={dubbers[index]}
            key={index}
          />
        );
      }
    });
    return (
      <>
        {/* //TODO link to a character page */}
        <Link href={""}>
          <p className="text-accent mb-1 text-md font-medium ">Characters</p>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 md:grid-cols-5 sm:grid-cols-4  mb-3 w-full">
          {characterCards}
        </div>
      </>
    );
  }
}

export default MediaCharacters;
