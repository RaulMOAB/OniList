import React from "react";
import RelationCard from "../Card/RelationCard";


function MediaRelations({ relation }) {

  if (relation.length !== 0) {
    //Maybe there are some medias without relations yet
    let relationCards = [];
    let aux_index=0;

    relation.forEach((element, index) => {
      if(aux_index==10){
        aux_index=0
      }
      relationCards.push(
        <RelationCard
          related_media={element.related_media}
          media_relationship={element.media_relationship}
          index={aux_index}
          key={index}
        />
      );
      aux_index++;
    });
    return (
      <>
        <div className="flex  sm:grid md:grid-cols-1 md:grid-flow-row md:gap-5 lg:grid-cols-6 xl:grid-cols-10 lg:gap-x-0  sm:grid-cols-4   mb-3 lg:w-full md:mx-auto ">
          {relationCards}
        </div>
      </>
    );
  }
}

export default MediaRelations;
