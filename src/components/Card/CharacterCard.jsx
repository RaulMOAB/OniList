import React from "react";
import Link from "next/link";
import Image from "next/image";

function CharacterCard({ character, index, role, dubber = null }) {
  //console.log(dubber);
  const link =
    "/character/" + character.id + "/" + character.romaji.replace(/ /g, "-"); //* like /character/1/name-name
  const character_name = character.romaji;
  const image = character.image_medium;
  let dubber_link = "";
  let dubber_image = "";
  let dubber_name = "";
  let dubber_japanese_name = "";
  //   const role = character.role
  if (dubber) {
    dubber_link =
      "/staff/" + dubber.id + "/" + dubber.romaji.replace(/ /g, "-");
    dubber_image = dubber.image_medium;
    dubber_name = dubber.romaji;
    dubber_japanese_name = dubber.name;
  }

  return (
    <div className="flex text-xs justify-between h-fit bg-neutral ">
      <div className="grid grid-flow-col">
        <div className="row-span-3 relative aspect-2/3 h-24 ">
          <Link href={link}>
            <Image
              className="rounded-md object-cover  w-full h-full"
              alt="cover image"
              src={image}
              width={10000}
              height={1}
            />
          </Link>
        </div>
        <div className="grid grid-rows-1 p-2">
          <Link href={link}>
            <div className="w-24 h-16 hover:text-primary">{character_name}</div>
          </Link>
          <div className="">
            <p className="capitalize text-xs">{role.toLowerCase()}</p>
          </div>
        </div>
      </div>
      <div className="grid  grid-flow-col  text-right">
        <div className="align-text-bottom p-2">
          <Link href={dubber_link}>
            <div className="col-span-2 w-22 h-16 hover:text-primary">
              {dubber_name}
            </div>
          </Link>
          <div className="row-span-2 col-span-2">
            <span className="">{dubber_japanese_name}</span>
          </div>
        </div>
        <div className="row-span-3 aspect-2/3 h-24 ">
          {dubber ? (
            <Link href={link}>
              <Image
                className="rounded-md object-cover  w-full h-full"
                alt="cover image"
                src={dubber_image}
                width={10000}
                height={1}
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
