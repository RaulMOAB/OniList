import React, { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Common/PageContainer/Container";
import MediaRelations from "./MediaRelations";
import MediaCharacters from "./MediaCharacters";
import MediaStaffFull from "./MediaStaffFull";
import MediaTrailer from "./MediaTrailer";
import { formatDate } from "@/components/utils/DateUtils";
import MediaTags from "./MediaTags";
import MediaExternalLinks from "./MediaExternalLinks";

/**
 * Get media relationship and related media info
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
 * Get characters that appears in media
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
 * Get staff who works in this media
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
        //console.log(res);
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
        //console.log(res)
        setStaff(res);
      });
      getMediaDetails(id).then((res) => {
        console.log(res);
        setMediaDetails(res);

        setMediaStatus(res.airing_status.toLowerCase());

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

        setSource(res.source.toLowerCase() ?? "");

        setGenres(JSON.parse(res.genres));

        setRomaji(res.romaji);

        setTitle(res.title);
        setNative(res.native);

        setType(res.type);

        setFormat(res.format.toLowerCase());
      });
    }
  }, [id]);

  return (
    <Container>
      {/* grid padre */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-10 xl:grid-cols-10 lg:gap-10 py-6 xl:px-20 ">
        <div className="grid grid-cols-1 h-fit xl:col-span-2 md:col-span-2   text-xs justify-between ">
          <div className="bg-neutral p-4">
            {/* media details */}
            {mediaStatus === "finished" ? (
              ""
            ) : (
              <div className="pb-2">
                <div className="font-semibold">Status</div>
                <div className="pt-1 capitalize">{mediaStatus}</div>
              </div>
            )}

            <div className="pb-2">
              <div className="font-semibold">Format</div>
              <div className="pt-1 capitalize">{format}</div>
            </div>
            {type === "ANIME" ? (
              <div className="pb-2">
                <div className="font-semibold">Episodes</div>
                <div className="pt-1">{mediaDetails.episodes}</div>
              </div>
            ) : mediaDetails.chapters ? (
              <div className="pb-2">
                <div className="font-semibold">Chapters</div>
                <div className="pt-1">{mediaDetails.chapters}</div>
              </div>
            ) : (
              ""
            )}
            {mediaDetails.type === "ANIME" ? (
              <div className="pb-2">
                <div className="font-semibold">Episode duration</div>
                <div className="pt-1">24 mins</div>
              </div>
            ) : (
              ""
            )}

            <div className="pb-2">
              <div className="font-semibold">Status</div>
              <div className="capitalize pt-1">{mediaStatus}</div>
            </div>
            <div className="pb-2">
              <div className="font-semibold">Start Date</div>
              <div>{startDate}</div>
            </div>
            <div className="pb-2">
              <div className="font-semibold">End Date</div>
              <div className="pt-1">{endDate}</div>
            </div>
            {mediaDetails.type === "ANIME" ? (
              <div className="pb-2">
                <div className="font-semibold">Season</div>
                <div className="capitalize pt-1">
                  {season + ", " + seasonYear}
                </div>
              </div>
            ) : (
              ""
            )}
            {studio.length > 0 ? (
              <div className="pb-2">
                <div className="font-semibold">Studios</div>
                {studio.map((e, i) => {
                  return (
                    <div className="pt-1" key={i}>
                      {e}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <div className="pb-2">
              <div className="font-semibold">Source</div>
              <div className="capitalize">{source}</div>
            </div>
            <div className="pb-2">
              <div className="font-semibold">Genres</div>
              <div className="capitalize pb-2">
                {genres.map((e, i) => {
                  return (
                    <div className="pt-1" key={i}>
                      {e}
                    </div>
                  );
                })}
              </div>
              <div className="pb-2">
                <div className="font-semibold">Romaji</div>
                <div className="pt-1">{romaji}</div>
              </div>
              <div className="pb-2">
                <div className="font-semibold">English</div>
                <div className="pt-1">{title}</div>
              </div>
              <div className="">
                <div className="font-semibold">Native</div>
                <div className="pt-1">{native}</div>
              </div>
            </div>
          </div>
          <div className=" h-fit mt-5  text-xs justify-between ">
            <p className="font-semibold pb-2 text-sm">Tags</p>
            {tags.map((tag, i) => {
              return <MediaTags tag={tag} key={i} />;
            })}
          </div>
          <div className=" h-fit mt-5  text-xs justify-between ">
            <p className="font-semibold pb-2 text-sm">
              {links.length ? "External & Streaming links" : ""}
            </p>
            {links.map((link, i) => {
              return <MediaExternalLinks link={link} key={i} />;
            })}
          </div>
        </div>

        {/* padre de los cards */}
        <div className="xl:col-span-8 xl:grid-cols-6 md:grid-cols-2 md:col-span-4  h-fit md:px-2 md:-mx-3 xl:px-2 ">
          <div className="pb-10">
            <MediaStaffFull staff={staff} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MediaBody;
