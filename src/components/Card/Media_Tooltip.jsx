import React from "react";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";

function Media_Tooltip() {
  let media = useContext(MediaContext);
  console.log(media);
  return (
    <div>
      <div>{media.title}</div>
      {/* <div>{dfsdf}</div>
      <div>
        <span>{sdfsdfe}</span> · <span>{msdfdes}</span>
      </div>
      <div>
        <div>{msdfsdfsdf}</div>
      </div> */}
    </div>
  );
}

export default Media_Tooltip;
