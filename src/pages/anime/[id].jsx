import React from "react";
import { useRouter } from "next/router";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import MediaPageCard from "@/components/Card/MediaPageCard";
import { BsFillHeartFill } from "react-icons/bs";

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

const getUserId = () => {
  const id = window.localStorage.getItem("user");
  console.log(id);
};
console.log(getUserId());
const isSubscribed = async () => {};

function AnimePage() {
  const router = useRouter();
  //let data = useContext(MediaContext);
  const { id } = router.query;
  const [media, setMedia] = useState();
  // console.log(id);

  useEffect(() => {
    getMedia(id)
      .then((res) => {
        setMedia(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (media) {
    console.log(media);
    return (
      <>
        <div
          className={"hero opacity-80 " + style.banner}
          style={{
            backgroundImage: `url("${media.banner_image}")`,
          }}
        >
          <div className={style.banner_shadow}></div>
        </div>
        <Container>
          <div className="grid grid-cols-2 2xl:px-24">
            <div className="-mt-28 z-30 w-fit">
              <MediaPageCard img={media.large_cover_image} />
              <div className="grid grid-flow-col mt-3">
                <div className="h-10 rounded-l-sm bg-primary-content">
                  <div className=" text-white">Add to Library</div>
                </div>
                <div className="h-10">
                  <div className="dropdown dropdown-bottom text-center rounded-full ">
                    <label
                      tabIndex={0}
                      className="p-0 h-10 border-none btn rounded-none rounded-r-sm  bg-primary-content bg-opacity-90 hover:bg-primary-content"
                    >
                      <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52"
                    >
                      <li>
                        <a>Set as Planning</a>
                      </li>
                      <li>
                        <a>Set as Watching</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <button className="bg-rose-600 rounded-md ">
                  <BsFillHeartFill className="text-white mx-auto" />
                </button>
              </div>
            </div>
            <div className="py-10 text-left">
              <h2 className="2xl:text-3xl">{media.title}</h2>
              <p className="mt-3"> {media.description}</p>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <div>
        <LoadingCloud />
      </div>
    );
  }
}

export default AnimePage;
