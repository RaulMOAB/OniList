import React from "react";
import RelationCard from "../Card/RelationCard";

function MediaRelations({ relation }) {
  //console.log(relation);

  if (relation.length !== 0) {
    //Maybe there ara some medias without relations yet
    let relationCards = [];
    //console.log(relation[0]);
    relation.forEach((element, index) => {
      // console.log(element.related_media)
      // console.log(element.media_relationship)
      relationCards.push(
        <RelationCard
          related_media={element.related_media}
          media_relationship={element.media_relationship}
          key={index}
        />
      );
    });
    return (
      <>
        <p className="text-accent mb-3 text-md font-medium ">Relations</p>
        <div className="grid grid-cols-3 md:grid-cols-1 md:grid-flow-row md:gap-4 lg:grid-cols-10 lg:gap-4   sm:grid-cols-4  mb-3 lg:w-full md:mx-auto ">
          {relationCards}
        </div>
      </>
    );
  }
}

export default MediaRelations;
