import React from "react";
import MediaCard from "./MediaCard";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Media_Tooltip from "./Media_Tooltip";

function ListPreview({ title, data }) {
  //let data = useContext(MediaContext);
  let media_data = [];

  data.map((item, i) => {
    if (i < 6) {
      media_data.push(item);
    }
    return media_data;
  });

  if (data.length === 0) {
    return (
      <>
        <LoadingCloud />
      </>
    );
  }
  return (
    <>
      <div className="">
        <h1 className="xl:text-lg uppercase font-bold mb-2 text-accent">
          {title}
        </h1>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6">
        {media_data.map((media, i) => {
          return <MediaCard key={i} media={media} index={i} />;
        })}
      </div>
    </>
  );
}

export default ListPreview;
