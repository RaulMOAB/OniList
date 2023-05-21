import React from "react";
import RelationCard from "../Card/RelationCard";


function MediaRelations({ relation }) {
  //console.log(relation);

  if (relation.length !== 0) {
    //Maybe there ara some medias without relations yet
    let relationCards = [];
    //console.log(relation[0]);
    let aux_index=0;
    relation.forEach((element, index) => {
      // console.log(element.related_media)
      // console.log(element.media_relationship)
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
      console.log(aux_index)
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
