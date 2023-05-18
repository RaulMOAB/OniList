/* eslint-disable @next/next/no-img-element */
import Media_Tooltip from "./Media_Tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchBarCard({ media, index }) {
  const route = useRouter();

  let type;
  media.type == 'ANIME' ? type = 'anime' : type = 'manga';

  //   console.log(media.id);
  const mediaPage = () => {
    route.push(`/${type}/${media.id}`);//TODO add media type 
  };

  return (
		<>
			<div 
        className="flex pt-4"
        onClick={mediaPage}>
        <div className="w-1/6">
            <img src={media.medium_cover_image} width={40} height={40} alt="" />
        </div>
        <div className="w-5/6">
            <p className="truncate font-semibold text-sm">{media.title}</p>
            <p className="truncate text-xs">{media.season_year} {media.format}</p>
        </div>

    </div>
		</>
	);
}
