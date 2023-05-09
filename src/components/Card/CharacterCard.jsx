import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

function CharacterCard({ character, index, role, dubber }) {
  console.log(dubber);

  const link =
    "/character/" + character.id + "/" + character.romaji.replace(/ /g, "-"); //* like /character/1/name-name
  const image = character.image_medium;
  const dubber_image = dubber.image_medium;
  const character_name = character.romaji;
  const dubber_name = dubber.romaji;
  const dubber_japanese_name = dubber.name;
  //   const role = character.role

  return (
    <div className="flex text-xs justify-between bg-base-300 h-fit">
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
          <div className="w-22 h-16">{character_name}</div>          
          <div className="">
            <p className="capitalize text-xs">{role.toLowerCase()}</p>
          </div>
        </div>
      </div>
      <div className="grid  grid-flow-col  text-right">
        <div className="align-text-bottom p-2">
          <div className="col-span-2 w-24">{dubber_name}</div>
          <div className="row-span-2 col-span-2">
            <span className="">{dubber_japanese_name}</span>
          </div>
        </div>
        <div className="row-span-3 aspect-2/3 h-24 ">
          <Link href={link}>
            <Image
              className="rounded-md object-cover  w-full h-full"
              alt="cover image"
              src={dubber_image}
              width={10000}
              height={1}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
