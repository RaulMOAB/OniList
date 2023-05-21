import React from "react";

function MediaTags({ tag, key }) {
  console.log(tag);
  return (
    <div className="sm:py-1 ">
      <div className="sm:bg-neutral text-sm p-3 truncate">{tag}</div>
    </div>
  );
}

export default MediaTags;
