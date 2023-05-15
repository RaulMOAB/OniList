import React from "react";
import Link from "next/link";
import Image from "next/image";

function RelationCard({ related_media, media_relationship, index }) {
  const link = "/" + related_media.type.toLowerCase() + "/" + related_media.id; //* it's like /anime/11345
  const image = related_media.medium_cover_image;
  const type = related_media.type;
  console.log(related_media);
  console.log("******************");
  console.log(media_relationship);
  const source = related_media.source;
  const title = related_media.title;
  const format = related_media.format;
  const status = related_media.airing_status;

  const formatSanitize = (format) => {
    if (format) return format.toLowerCase().replace("_", " ");
  };
  //console.log(image)
  return (
    <div className="w-full">
      <div className="relative aspect-2/3 h-32">
        <Link href={link} className="group">
          <Image
            className="rounded-md object-cover  w-full h-full"
            alt="cover image"
            src={image}
            width={10000}
            height={1}
          />
          <div className="lg:hidden lg:group-hover:block  transition duration-300 ease-in  lg:hover:invisible absolute top-0 left-full z-10 h-full lg:w-60 md:w-96 text-xs p-2 bg-base-content">
            <div className="mb-3 flex flex-col justify-between h-full">
              <Link href={link} className="group">
                <p className="hover:text-primary">{title}</p>
              </Link>
              <p className="capitalize">
                {formatSanitize(format) + " · " + status.toLowerCase()}
              </p>
            </div>
          </div>
        </Link>

        <div className="absolute bottom-0 h-fit w-full p-1 bg-base-100 rounded-b-sm text-accent">
          <p className="text-center drop-shadow capitalize text-xs">
            {source !== "OTHER" ? formatSanitize(format) : "Manga"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RelationCard;
