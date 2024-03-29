import React from "react";
import CharacterCard from "../Card/CharacterCard";
import Link from "next/link";

function MediaCharacters({ characters, dubbers, role }) {
  if (characters.length !== 0) {
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
				<p className='text-accent mb-3 text-md font-medium '>Characters</p>

				<div className='grid grid-cols-1 lg:grid-cols-1 lg:gap-x-10 xl:grid-cols-2 md:grid-cols-1 md:grid-flow-row md:gap-4 md:w-full  md:pr-6 lg:pr-0 sm:grid-cols-4  mb-3 w-full gap-4'>
					{characterCards}
				</div>
			</>
		);
  }
}

export default MediaCharacters;
