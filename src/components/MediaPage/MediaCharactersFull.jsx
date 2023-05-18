import React from "react";
import CharacterCard from "../Card/CharacterCard";
import Link from "next/link";

function MediaCharacters({ characters, dubbers, role }) {
  //console.log(dubbers)
  if (characters.length !== 0) {
    //console.log(characters);
    let characterCards = [];
    characters.forEach((element, index) => {
      //num of cards
      characterCards.push(
        <CharacterCard
          character={element.character_data}
          role={role[index]}
          dubber={dubbers !== null ? dubbers[index] : ""}
          key={index}
        />
      );
    });
    return (
      <>
        <p className="text-accent mb-3 text-md font-medium ">Characters</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 xl:gap-6 md:grid-cols-1 md:grid-flow-row md:gap-4 md:w-full sm:grid-cols-4  mb-3 w-full">
          {characterCards}
        </div>
      </>
    );
  }
}

export default MediaCharacters;
