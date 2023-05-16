import React from "react";
import StaffCard from "../Card/StaffCard";
import Link from "next/link";

function MediaTrailer({ trailer }) {

  if (trailer !== null) {
    const trailer_link = trailer.id;  
    return (
      <div className="">
        <p className="text-accent mb-3 text-md font-medium ">Trailer</p>
        <iframe
        className="aspect-video md:w-full lg:w-fit"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer_link}`}
          title="YouTube video player"        
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}

export default MediaTrailer;
