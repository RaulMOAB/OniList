import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import MediaPageCard from "@/components/Card/MediaPageCard";
import { BsFillHeartFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

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

const getMediaSubscribed = async (user_id, media_id) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/status/${user_id}/${media_id}`,
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

function AnimePage() {
  const router = useRouter();
  const { getUserID } = useContext(AuthContext);
  const { id } = router.query;
  const [media, setMedia] = useState();
  const user_id = getUserID();
  const [subscribe, isSubsribed] = useState([]);
  // console.log(id);

  useEffect(() => {
    getMedia(id)
      .then((res) => {
        setMedia(res);
      })
      .catch((e) => {
        console.log(e);
      });
    getMediaSubscribed(user_id, id).then((res) => {
      isSubsribed(res);
    });
  }, [id]);

  if (media) {
    console.log(media);
    if (subscribe) {
      console.log(subscribe[0]);
    }
    const updateStatus = () => {};

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
          <div className="grid grid-rows-1 gap-8 grid-flow-col 2xl:px-24">
            <div className="-mt-28 z-30 w-fit">
              <MediaPageCard img={media.large_cover_image} />
              <div className=" flex flex-shrink gap-5 mt-3">
                <div
                  className={
                    "flex w-full px-1 justify-center items-center  rounded-l-md bg-primary-content " +
                    style.custom_btn
                  }
                >
                  <div className=" text-white capitalize ">
                    {
                      subscribe.length === 0
                        ? "Add to Library"
                        : subscribe[0].status /*TODO format string*/
                    }
                  </div>
                </div>
                <div className={" " + style.custom_btn}>
                  <div className="dropdown hover:bg-opacity-95 ">
                    <label
                      tabIndex={0}
                      className={
                        "flex -mx-8 w-8 justify-center items-center  bg-primary-content hover:bg-primary rounded-none border-none rounded-r-md cursor-pointer " +
                        style.custom_btn
                      }
                    >
                      <svg
                        className="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </label>
                    {/* if users is not subscribe */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={updateStatus("PLAN TO WATCH")}>
                          Set as Planning
                        </a>
                      </li>
                      <li>
                        <a onClick={updateStatus("WATCHING")}>
                          Set as Watching
                        </a>
                      </li>

                      {}
                    </ul>
                  </div>
                </div>
                <button className="w-20 bg-rose-600 rounded-md ">
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
