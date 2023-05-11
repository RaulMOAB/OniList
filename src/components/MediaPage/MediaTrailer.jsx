import React from "react";
import StaffCard from "../Card/StaffCard";
import Link from "next/link";

function MediaTrailer({ trailer }) {
  //   console.log(trailer);
  //console.log(Object.keys(trailer).length)
  if (trailer !== null) {
    const trailer_link = trailer.id;
    console.log(trailer_link);
    return (
      <div>
        <p className="text-accent mb-3 text-md font-medium ">Trailer</p>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer_link}`}
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    );
  }
}

export default MediaTrailer;
