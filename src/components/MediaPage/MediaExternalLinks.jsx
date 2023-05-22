import React from "react";
import { BsTwitter } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import { SiCrunchyroll, SiBilibili, SiHbo, SiFunimation } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

function MediaExternalLinks({ link, key }) {
  //console.log(link);
  let external_sites = [
    "twitter",
    "netflix",
    "crunchyroll",
    "bilibili",
    "hbomax",
    "funimation",
  ];
  let result = null;

  const socialSites = [
    {
      word: "twitter",
      color: "hover:bg-[#1da0f2a6]",
      icon: <BsTwitter className="text-[#1da1f2]" />,
    },
    {
      word: "netflix",
      color: "hover:bg-[#e50914a9]",
      icon: (
        <RiNetflixFill className="text-[#e50914] stroke-[#000000] stroke-width-2" />
      ),
    },
    {
      word: "crunchyroll",
      color: "hover:bg-[#f88b24b4]",
      icon: <SiCrunchyroll className="text-[#f88b24]" />,
    },
    {
      word: "bilibili",
      color: "hover:bg-[#00a0d6ce]",
      icon: <SiBilibili className="text-[#00a1d6]" />,
    },
    {
      word: "hbomax",
      color: "hover:bg-[#991eebc7]",
      icon: <SiHbo className="text-[#991eeb]" />,
    },
    {
      word: "funimation",
      color: "hover:bg-[#5a0bb5c4]",
      icon: <SiFunimation className="text-[#5b0bb5]" />,
    },
  ];

  external_sites.find((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i").test(link);
    if (regex) {
      const site = socialSites.find((site) => site.word === word);
      if (site) {
        result = (
          <div
            className={`bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md ${site.color}`}
          >
            <Link href={link}>
              <div className="flex">
                <span>{site.icon}</span>
                <span className="text-xs pl-1">{site.word}</span>
              </div>
            </Link>
          </div>
        );
      }
    }
  });

  if (!result) {
    result = (
      <div className="bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-[#0c66a6b6]">
        <div className="flex">
          <span>
            <FiExternalLink className="text-[#0c65a6]" />
          </span>
          <span className="text-xs pl-1">
            <Link href={link}>External link</Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:py-1">
      <div className="bg-transparent sm:bg-neutral text-sm p-1  ">{result}</div>
    </div>
  );
}

export default MediaExternalLinks;
