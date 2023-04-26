import React, { useState } from "react";
import style from "../../styles/Banner.module.css";

function ReadMoreToggle({ media }) {
  const [isShowMore, setIsShowMore] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <div className="py-10 text-left">
      <h2 className="2xl:text-3xl">{media.title}</h2>
      <p className={"mt-3 2xl:text-sm " + style.description}>
        {isShowMore && (media.description)}
      </p>

      <button onClick={toggleReadMoreLess}>
        {isShowMore ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

export default ReadMoreToggle;
