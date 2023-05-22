import React from "react";

function MediaTrailer({ trailer }) {

  if (trailer !== null) {
    const trailer_link = trailer.id;  
    return (
      <div className="w-full">
        <p className="text-accent mb-3 text-md font-medium ">Trailer</p>
        <div className="aspect-video">
        <iframe
        className="w-full h-full"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer_link}`}
          title="YouTube video player"        
          allowFullScreen
        ></iframe>
        </div>
      </div>
    );
  }
}

export default MediaTrailer;
