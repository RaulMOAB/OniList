import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

function MediaPageCard({ img }) {
  const [image, setImage] = useState();

  useEffect(() => {
    img ? setImage(img) : setImage(null);
  }, [img]);

  return (
    <>
      <div>
        <div className="w-fit">
          <img src={img} alt="Media picture" className="rounded-sm"/>
        </div>
      </div>
    </>
  );
}

export default MediaPageCard;
