import React from "react";
import { BsTwitter } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import { SiCrunchyroll, SiBilibili, SiHbo, SiFunimation } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

function MediaExternalLinks({ link, key }) {
  console.log(link)
  let external_sites = [
    "twitter",
    "netflix",
    "crunchyroll",
    "bilibili",
    "hbomax",
    "funimation",
  ];
  let result = null;
  external_sites.find((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i").test(link);
    if (regex) {
      switch (word) {
        case "twitter":
          result = (
            <div className="bg-neutral text-sm p-3 hover:bg-[#1d9dece0] hover:text-white hover:shadow-lg hover:rounded-md">
            <Link href={link}>
              <div className="flex">
                <span className=""> {/* Add this line */}
                  <BsTwitter className="text-[#1da1f2]" />
                </span>
                <span className="text-xs pl-1">Twitter</span>
              </div>
            </Link>
          </div>
          
          );
          break;
        case "netflix":
          result = (
            <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#d40812d7]">
              {
                <Link href={link}>
                  <div className="flex">
                    <span>
                      <RiNetflixFill className="text-[#e50914] stroke-[#000000] stroke-width-2" />
                    </span>
                    <span className="text-xs pl-1">Netflix</span>
                  </div>
                </Link>
              }
            </div>
          );
          break;
        case "crunchyroll":
          result = (
            <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#f88b24d5]">
              {
                <Link href={link}>
                  <div className="flex">
                    <span>
                      <SiCrunchyroll className="text-[#f88b24]" />
                    </span>
                    <span className="text-xs pl-1">Crunchyroll</span>
                  </div>
                </Link>
              }
            </div>
          );
          break;
        case "bilibili":
          result = (
            <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#00a0d6d0]">
              {
                <Link href={link}>
                  <div className="flex">
                    <span>
                      <SiBilibili className="text-[#00a1d6]" />
                    </span>
                    <span className="text-xs pl-1">
                      {link.includes(".tv") ? "BiliBili TV" : "BiliBili"}
                    </span>
                  </div>
                </Link>
              }
            </div>
          );
          break;
        case "hbomax":
          result = (
            <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#991eebb2]">
              {
                <Link href={link}>
                  <div className="flex">
                    <span>
                      <SiHbo className="text-[#991eeb]" />
                    </span>
                    <span className="text-xs pl-1">HBO</span>
                  </div>
                </Link>
              }
            </div>
          );
          break;
        case "funimation":
          result = (
            <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#5a0bb5c0]">
              {
                <Link href={link}>
                  <div className="flex">
                    <span>
                      <SiFunimation className="text-[#5b0bb5]" />
                    </span>
                    <span className="text-xs pl-1">Funimation</span>
                  </div>
                </Link>
              }
            </div>
          );
          break;
        default:
          break;
      }
    }
  });

  return (
    <div className="py-1 ">
      <div className="bg-neutral text-sm p-3">
        {result
          ? result
          : (result = (
              <div className="bg-neutral text-sm p-3  hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#0c66a6b6]">
                {
                  <div className="flex">
                    <span>
                      <FiExternalLink className="text-[#0c65a6]" />
                    </span>
                    <span className="text-xs pl-1">
                      <Link href={link}>External link</Link>
                    </span>
                  </div>
                }
              </div>
            ))}
      </div>
    </div>
  );
}

export default MediaExternalLinks;
