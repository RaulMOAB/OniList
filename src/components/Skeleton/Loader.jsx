import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


export default function Loader({ media, index }) {

    return (
      <SkeletonTheme baseColor='gray' highlightColor='gray'>
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
          <div className="cursor-pointer animate-pulse">
            <Skeleton duration={0.5} width={185} height={230}/>
          </div>
          <div className="h-16 rounded-b-md">
            <div className="">
              <div className="flex animate-pulse">
                <p className="mt-2 sm-2 w-4/6 truncate">
                  {<Skeleton duration={0.5}/>}
                </p>
                <div className="w-2/6 mt-2 text-right animate-pulse">
                  <i
                    className=" fa-solid fa-star"
                    style={{ color: "#f5c211" }}
                  ></i>
                  <p className="inline-block animate-pulse">{<Skeleton duration={0.5}/>}</p>
                </div>
              </div>
              <p className="mt-1 ms-2 truncate animate-pulse">{<Skeleton duration={0.5}/>}</p>
            </div>
          </div>
        </div>
      </SkeletonTheme>
      
    )

} 