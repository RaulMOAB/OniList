import React from "react";

function MediaTags({ tag, key }) {
  console.log(tag);
  return (
    <div className="py-1 ">
      <div className="bg-neutral text-sm p-3">{tag}</div>
    </div>
  );
}

export default MediaTags;
