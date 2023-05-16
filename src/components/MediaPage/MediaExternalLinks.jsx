import React from "react";
import { BsTwitter } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import { SiCrunchyroll, SiBilibili, SiHbo, SiFunimation } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

function MediaExternalLinks({ link, key }) {
  console.log(link);
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
      color: "#1da1f2",
      icon: <BsTwitter className="text-[#1da1f2]" />,
    },
    {
      word: "netflix",
      color: "#e50914",
      icon: (
        <RiNetflixFill className="text-[#e50914] stroke-[#000000] stroke-width-2" />
      ),
    },
    {
      word: "crunchyroll",
      color: "#f88b24",
      icon: <SiCrunchyroll className="text-[#f88b24]" />,
    },
    {
      word: "bilibili",
      color: "#00a1d6",
      icon: <SiBilibili className="text-[#00a1d6]" />,
    },
    {
      word: "hbomax",
      color: "#991eeb",
      icon: <SiHbo className="text-[#991eeb]" />,
    },
    {
      word: "funimation",
      color: "#5b0bb5",
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
            className={`bg-neutral text-sm p-3 hover:text-white hover:shadow-lg hover:rounded-md hover:bg-${site.color}`}
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
    <div className="py-1">
      <div className="bg-neutral text-sm p-3">{result}</div>
    </div>
  );
}

export default MediaExternalLinks;
