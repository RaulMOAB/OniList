import React from "react";
import MediaCard from "./MediaCard";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Media_Tooltip from "./Media_Tooltip";
import Link from "next/link";

function ListPreview({ title, data , type = 'anime', route}) {
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
			<div className="mt-10">
				<div className='mb-5 flex'>
					<h1 className='w-1/2 xl:text-lg uppercase font-bold mb-2 text-accent'>
						{title}
					</h1>
					<span className='w-1/2 xl:text-xs font-semibold mb-2 text-accent text-right'>
						<Link href={route}> View All </Link> 
					</span>
				</div>
				<div className='grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 md:gap-8 2xl:gap-10 xl:gap-6'>
					{media_data.map((media, i) => {
						return (
							<MediaCard
								key={i}
								media={media}
								index={i}
								type = {type}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default ListPreview;
