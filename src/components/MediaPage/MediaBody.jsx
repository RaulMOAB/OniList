import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Common/PageContainer/Container";
import MediaRelations from "./MediaRelations";
import MediaCharacters from "./MediaCharacters";
import MediaStaff from "./MediaStaff";
import MediaTrailer from "./MediaTrailer";
import { formatDate } from "@/components/utils/DateUtils";
import MediaTags from "./MediaTags";
import MediaExternalLinks from "./MediaExternalLinks";

/**
 * Function to get media relationship and related media info
 * @param {*} media_id
 * @returns Array of relation and medias related
 */
const getMediaRelatedTo = async (media_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `${media_id}/relations`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

/**
 * Function to get characters that appears in media
 * @param {*} media_id
 * @returns Array of characters and their data
 */
const getCharacterAppearsIn = async (media_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `media/characters/${media_id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

/**
 * Function to get staff who works in this media
 * @param {*} media_id
 * @returns Array of staff and their data
 */
const getMediaStaff = async (media_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `${media_id}/staff`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
/**
 * Function to get more detailed media data
 * @param {*} media_id 
 * @returns all detailed media data
 */
const getMediaDetails = async (media_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `media/${media_id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

function MediaBody() {
  const router = useRouter();
  const { id } = router.query;

  //media state
  const [relation, setRelation] = useState([]);
  const [characters, setCharacter] = useState([]);
  const [role, setRole] = useState([]);
  const [dubbs, setDubbs] = useState([]);
  const [staff, setStaff] = useState([]);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [mediaStatus, setMediaStatus] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [season, setSeason] = useState("");
  const [seasonYear, setSeasonYear] = useState("");
  const [studio, setStudio] = useState([]);
  const [source, setSource] = useState("");
  const [genres, setGenres] = useState([]);
  const [romaji, setRomaji] = useState("");
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const [native, setNative] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (id) {
      getMediaRelatedTo(id).then((res) => {
        setRelation(res);
      });
      getCharacterAppearsIn(id).then((res) => {
        setCharacter(res);
        let roles = [];
        let dubbers = [];
        res.forEach((e, i) => {
          roles.push(e.character.role);
          dubbers.push(e.dubber_data);
        });

        setRole(roles);
        setDubbs(dubbers);
      });
      getMediaStaff(id).then((res) => {
        setStaff(res);
      });
      getMediaDetails(id).then((res) => {
        setMediaDetails(res);
        setMediaStatus(res.airing_status.replace(/_/g, " ").toLowerCase());

        if (res.season) setSeason(res.season.toLowerCase() ?? "");

        if (res.season_year) setSeasonYear(res.season_year ?? "");

        let start_date = formatDate(res.start_date);
        setStartDate(start_date);

        let end_date = formatDate(res.end_date);
        setEndDate(end_date);

        setTrailer(JSON.parse(res.trailer));

        setStudio(JSON.parse(res.studios));

        if (res.tags.length) setTags(JSON.parse(res.tags));

        if (res.external_link.length) setLinks(JSON.parse(res.external_link));

        if (res.source) setSource(res.source.toLowerCase() ?? "");

        setGenres(JSON.parse(res.genres));

        setRomaji(res.romaji);

        setTitle(res.title);

        setNative(res.native);

        setType(res.type);

        if (res.format) setFormat(res.format.toLowerCase());
      });
    }
  }, [id]);

  return (
    <Container>
      {/* grid container */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-10  xl:grid-cols-10  lg:gap-2 py-6 xl:px-24 ">
        <div className="grid grid-cols-1 h-fit xl:col-span-2 lg:col-span-1 md:col-span-2 lg:w-[230px] text-xs justify-between p-5 sm:p-0">
          <div className="bg-neutral overflow-x-auto md:block mx-auto w-full px-3 flex p-4 py-4 pb-2 sm:p-4">
            {/* media details */}
            {mediaStatus === "finished" ? (
              ""
            ) : (
              <div className="flex-none md:block mr-5 md:mr-0 ">
                <div className="font-semibold">Status</div>
                <div className="md:pt-1 capitalize">{mediaStatus}</div>
              </div>
            )}

            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold">Format</div>
              <div className="pt-1 capitalize">{format}</div>
            </div>
            {type === "ANIME" ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">Episodes</div>
                <div className="pt-1">{mediaDetails.episodes}</div>
              </div>
            ) : mediaDetails.chapters ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">Chapters</div>
                <div className="pt-1">{mediaDetails.chapters}</div>
              </div>
            ) : (
              ""
            )}
            {mediaDetails.type === "ANIME" ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">Episode duration</div>
                <div className="pt-1">24 mins</div>
              </div>
            ) : (
              ""
            )}

            {mediaStatus !== "finished" ? (
              ""
            ) : (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">Status</div>
                <div className="pt-1 capitalize">{mediaStatus}</div>
              </div>
            )}
            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold">Start Date</div>
              <div className="pt-1">{startDate}</div>
            </div>
            {endDate ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">End Date</div>
                <div className="pt-1">{endDate}</div>
              </div>
            ) : (
              ""
            )}

            {mediaDetails.type === "ANIME" ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold">Season</div>
                <div className="capitalize pt-1">
                  {season + ", " + seasonYear}
                </div>
              </div>
            ) : (
              ""
            )}
            {studio.length > 0 ? (
              <div className="flex-none md:block mr-5 md:mr-0 pb-2">
                <div className="font-semibold md:mb-0 mb-1">Studios</div>
                {studio.map((e, i) => {
                  return (
                    <div
                      className="inline md:block md:border-none border border-accent rounded-full md:p-0 p-1 pt-1"
                      key={i}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold">Source</div>
              <div className="capitalize pt-1 ">{source}</div>
            </div>
            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold md:mb-0 mb-1">Genres</div>
              <div className="capitalize">
                {genres.map((e, i) => {
                  return (
                    <div
                      className="inline md:block md:border-none border border-accent rounded-full md:p-0 p-1"
                      key={i}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold">Romaji</div>
              <div className="pt-1">{romaji}</div>
            </div>
            <div className="flex-none md:block mr-5 md:mr-0 pb-2">
              <div className="font-semibold">English</div>
              <div className="pt-1">{title}</div>
            </div>
            <div className="flex-none md:block mr-5 md:mr-0 ">
              <div className="font-semibold">Native</div>
              <div className="pt-1">{native}</div>
            </div>
          </div>
          <div className=" h-fit mt-5  text-xs justify-between ">
            <p className="font-semibold pb-2 text-sm">Tags</p>
            <div className="bg-neutral sm:bg-transparent overflow-x-auto md:block mx-auto w-full  flex  sm:p-0">
              {tags.map((tag, i) => {
                return <MediaTags tag={tag} key={i} />;
              })}
            </div>
          </div>
          <div className="h-fit mt-5  text-xs justify-between ">
            <p className="font-semibold pb-2 text-sm">
              {links.length ? "External & Streaming links" : ""}
            </p>
            <div className="grid grid-cols-2 sm:block">
              {links.map((link, i) => {
                return <MediaExternalLinks link={link} key={i} />;
              })}
            </div>
          </div>
        </div>

        {/* cards container */}
        <div className="w-full lg:col-span-4 xl:col-span-8 xl:grid-cols-6 md:grid-cols-2 md:col-span-4  h-fit md:px-2 md:-mx-3 xl:px-2 lg:pl-24 p-5 sm:p-0">
		<p className="text-accent mb-3 text-md font-medium ">Relations</p>
          <div className="pb-8 md:w-full overflow-x-auto sm:overflow-hidden md:block mx-auto w-full  flex">
            <div className="flex-none md:block mr-5 md:mr-0">
              <div className="">
                <MediaRelations relation={relation} />
              </div>
            </div>
          </div>
          <div className="pb-10 md:w-full ">
            <MediaCharacters
              characters={characters}
              dubbers={type === "ANIME" ? dubbs : null}
              role={role}
            />
          </div>
          <div className="pb-10">
            <MediaStaff staff={staff} />
          </div>
          <div className="pb-10 mx-auto">
            <MediaTrailer trailer={trailer} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MediaBody;
