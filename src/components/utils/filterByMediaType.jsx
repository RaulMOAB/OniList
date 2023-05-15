import React from "react";

/**
 * Function to filter by media type
 * @param {*} param media type
 * @returns actual status depending of their media type
 */
function filterByMediaType(mediaType) {
  let status;
  if (mediaType === "MANGA") {
    switch (res.status) {
      case "WATCHING":
        status = "READING";
        break;
      case "REWATCHING":
        status = "REREADING";
        break;
      case "PLAN TO WATCH":
        status = "PLAN TO READ";
        break;
      default:
        break;
    }
  }
  return status;
}

export default filterByMediaType;
