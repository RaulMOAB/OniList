import React from "react";
import { useRouter } from "next/router";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";

const getMedia = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/anime/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

function AnimePage() {
  const router = useRouter();
  //let data = useContext(MediaContext);
  const { id } = router.query;
  const [media, setMedia] = useState();
  console.log(id);

  useEffect(() => {
    getMedia(id)
      .then((res) => {
        setMedia(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <>
      {media ? (
        <div
          className={"hero min-h-16"}
          style={{
            backgroundImage: `url("${media.banner_image}")`,
          }}
        ></div>
      ) : (
        <div>ola</div>
      )}
    </>
  );
}

export default AnimePage;
