import React from "react";

/**
 * Function to filter by media type
 * @param {*} param media type
 * @returns actual status depending of their media type
 */
function filterByMediaType(mediaType, default_status) {
  let status;
  if (mediaType === "MANGA") {
    switch (default_status) {
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
        status = default_status
				break;
		}
  }else{
    status = default_status;
  }
  return status;
}

export default filterByMediaType;
