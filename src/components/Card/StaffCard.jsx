import React from "react";
import Link from "next/link";
import Image from "next/image";

function StaffCard({ staff, index }) {
  const link =
    "/staff/" +
    staff.staff.person_id +
    "/" +
    staff.staff_data.romaji.replace(/ /g, "-"); //* like /staff/1/name-name
  const image = staff.staff_data.image_medium;
  const staff_name = staff.staff_data.romaji;
  const staff_job = staff.staff.job;
  return (
    <div className="flex text-xs justify-between bg-neutral rounded-md h-fit">
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
        <div className="w-24 h-16 hover:text-primary">{staff_name}</div>          
      </Link>
        <div className="">
          <p className="capitalize text-xs">{staff_job}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default StaffCard;
