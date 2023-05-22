import React from "react";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";

function Media_Tooltip() {
  let media = useContext(MediaContext);
  return (
    <div>
      <div>{media.title}</div>
    </div>
  );
}

export default Media_Tooltip;
