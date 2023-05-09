import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Common/PageContainer/Container";
import FilterMedia from "@/components/UserList/FilterMedia";
import MediaRelations from "./MediaRelations";
import MediaCharacters from "./MediaCharacters";

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

const getDubber = async (character_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `staff/${character_id}`,
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

// console.log(getDubber(1));

function MediaBody() {
  const router = useRouter();
  const { id } = router.query;
  const [relation, setRelation] = useState([]);
  const [characters, setCharacter] = useState([]);
  const [role, setRole] = useState([]);
  const [dubbs, setDubbs] = useState([]);

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
          //console.log(e.character)
          roles.push(e.character.role);
          dubbers.push(e.dubber_data);
        });

        setRole(roles);
        setDubbs(dubbers);
       
      });
    }
  }, [id]);

  //console.log(relation)
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-10 py-6 lg:px-20">
        <div className=" h-96 bg-neutral"></div>
        <div className=" col-span-4  grid-cols-6 h-fit bg-neutral">
          <MediaRelations relation={relation} />
          <MediaCharacters characters={characters} dubbers={dubbs} role={role} />
        </div>
      </div>
    </Container>
  );
}

export default MediaBody;
