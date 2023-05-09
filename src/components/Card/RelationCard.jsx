import React from "react";
import Link from "next/link";
import Image from "next/image";

function RelationCard({ related_media, media_relationship, index }) {
  //console.log(related_media)
  const link = "/" + related_media.type.toLowerCase() + "/" + related_media.id; //* it's like /anime/11345
  const image = related_media.medium_cover_image;
  const type = related_media.type;
  const source = related_media.source;
  const title = related_media.title;
  //console.log(image)
  return (
    <div>
      <div className="relative aspect-2/3 h-32 ">
        <Link href={link}>
          <Image
            className="rounded-md object-cover  w-full h-full"
            alt="cover image"
            src={image}
            width={10000}
            height={1}
          />
        </Link>

        <div className="absolute bottom-0 h-fit w-full p-1 bg-base-100 rounded-b-sm text-slate-300">
          <p className="text-center drop-shadow capitalize text-xs">
            {source.toLowerCase()}
          </p>
        </div>
        <div className=" absolute top-0 left-full z-10 h-full w-full text-xs">
          <div className="">
            <p className="mb-3">{source}</p>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelationCard;
