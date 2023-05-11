import React from "react";
import StaffCard from "../Card/StaffCard";
import Link from "next/link";

function MediaStaff({ staff }) {
  //console.log(staff);
  if (staff.length !== 0) {
    let staffCards = [];
    staff.forEach((element, index) => {
      if (index < 3) {
        staffCards.push(
            <StaffCard staff={element} key={index}/>
        );
      }
    });
    return (
      <>
        {/* //TODO link to a character page */}
        <Link href={""}>
          <p className="text-accent mb-3 text-md font-medium ">Staff</p>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 md:grid-cols-5 sm:grid-cols-4  mb-3 w-full">
          {staffCards}
        </div>
      </>
    );
  }
}

export default MediaStaff;
