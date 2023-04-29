import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


export default function Loader({ media, index }) {

    return (
        <div
        className={
          index <= 3
            ? "relative rounded-md bg-cover w-fit"
            : index != 5
            ? "relative rounded-md bg-cover w-fit md:hidden lg:block"
            : "relative rounded-md bg-cover w-fit xl:block lg:hidden md:hidden"
        }
        key={index}
      >
        <div className="cursor-pointer">
          <img
            src={media.large_banner_image || media.extra_large_cover_image || media.large_cover_image}
            className="rounded-md blur-sm"
            alt="media image"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-md backdrop-blur-md">
            <div className="px-2">
              <div className="flex">
                <p className="mt-2 sm-2 w-4/6 truncate">
                  {<Skeleton duration={0.5}/>}
                </p>
                <div className="w-2/6 mt-2 text-right">
                  <i
                    className=" fa-solid fa-star"
                    style={{ color: "#f5c211" }}
                  ></i>
                  <p className="inline-block">{<Skeleton duration={0.5}/>}</p>
                </div>
              </div>
              <p className="mt-1 ms-2 truncate">{<Skeleton duration={0.5}/>}</p>
            </div>
          </div>
        </div>
      </div>
    )

} 