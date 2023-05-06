import React from "react";
import RelationCard from "../Card/RelationCard";

function MediaRelations({ relation }) {
  console.log(relation);

  if (relation.length !== 0) {
    //Maybe there ara some medias without relations yet
    let relationCards = [];
    console.log(relation[0].related_media);
    relation.forEach((element, index) => {
      // console.log(element.related_media)
      // console.log(element.media_relationship)
      relationCards.push(
        <div>
          <RelationCard
            related_media={element.related_media}
            media_relationship={element.media_relationship}
            key={index}
          />
        </div>
      );
    });
    return (
      <>
        <p className="text-accent mb-1 text-lg ">Relations</p>
        <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 gap-10 mb-3 w-full">
          {relationCards}
        </div>
      </>
    );
  }
}

export default MediaRelations;