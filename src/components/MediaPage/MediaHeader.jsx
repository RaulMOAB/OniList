import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import style from "../../styles/Banner.module.css";
import LoadingCloud from "@/components/Loading/LoadingCloud";
import Container from "@/components/Common/PageContainer/Container";
import MediaPageCard from "@/components/Card/MediaPageCard";
import MediaEditor from "@/components/Modals/MediaEditor";
import ReadMore from "../utils/ReadMore";
import Alert from "@/components/Alerts/Alert_prueba";
import { BsFillHeartFill } from "react-icons/bs";
import filterByMediaType from "../utils/filterByMediaType";

/**
 * Function that gets a media by id
 * @param {*} id media id
 * @returns json with all media information
 */
const getMedia = async (id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `media/${id}`,
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
 * Function to get if an user is subscribed to a media
 * @param {*} user_id
 * @param {*} media_id
 * @returns json with the actual status of a media
 */
const getMediaSubscribed = async (user_id, media_id) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `status/${user_id}/${media_id}`,
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

function MediaHeader() {
  const router = useRouter();
  const { getUserID, isUserAuthenticated, fetchData } = useContext(AuthContext);
  const { id } = router.query;
  const [media, setMedia] = useState();
  const user_id = getUserID();
  const [subscribe, isSubsribed] = useState({});
  const [status, setStatus] = useState("Add to Library");
  const [favorite, setFavorite] = useState(0);
  const [type, setType] = useState("");

  //*Alert state
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const [isShowMore, setIsShowMore] = useState(true);

  //Dropdown state
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    // setFavorite(favorite)
    let aux_type, aux_favorite, aux_status;
    if (id) {
      getMedia(id)
        .then((res) => {          
          setMedia(res);
          aux_type = res.type;          
          setType(aux_type);
          getMediaSubscribed(user_id, id).then((res) => {
            isSubsribed(res);
            console.log(res);
            if (res) {
              aux_type = filterByMediaType(res.type);
              aux_favorite = res.favorite;
              setType(aux_type ?? '');
              setStatus(res.status);
              setFavorite(aux_favorite ?? 0);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);
  

  const updateStatus = async (status, deleted, favorite = 0) => {
    const body = JSON.stringify({
      user_id,
      media_id: id,
      status: status,
      favorite,
    });
    console.log(body);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `status`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );
    setStatus(status); // cambia el texto del boton

    if (type === "MANGA") {
      switch (status) {
        case "WATCHING":
          status = "READING";
          break;
        case "REWATCHING":
          status = "REREADING";
          break;
        case "PLAN TO WATCH":
          status = "PLAN TO READ";
          break;
        default:
          break;
      }
    }
    if (deleted) {
      setMessage(`${media.title} was deleted from your list.`);
      setShowError(true);
      setFavorite(0);
    } else {
      if (response.status === 200) {
        setMessage(`${media.title} added to ${status} list.`);
        setShowError(true);
      }
      return response.json();
    }
  };

  const handleFavorite = (event) => {
    event.preventDefault();
    let aux_fav;
    // favorite === 0 ? setFavorite(1) : setFavorite(0);
    if (favorite === 0) {
      aux_fav = 1;
      setFavorite(aux_fav);
      setFavoriteToMedia(aux_fav);
    } else {
      aux_fav = 0;
      setFavorite(aux_fav);
      setFavoriteToMedia(aux_fav);
    }
    console.log(aux_fav);

    //*Llamada Api
    //setFavoriteToMedia(favorite);
    //return favorite;
  };

  const setFavoriteToMedia = async (favorite, status = "WATCHING") => {
    console.log(favorite);
    const body = JSON.stringify({
      user_id: user_id,
      media_id: id,
      status: status,
      favorite: favorite,
    });

    const endpoint = "media/favorite";
    const method = "POST";
    if (isUserAuthenticated()) {
      fetchData(endpoint, method, body).then((res) => {
        console.log("************************");
        console.log(res);
      });
      updateStatus(status, false, favorite ?? 1);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const resetAlert = () => {
    setShowError(false);
  };

  if (media) {
    //if media is not undefined
    const media_images = {
      large: media.large_cover_image,
      medium: media.medium_cover_image,
    };
    return (
      <>
        <div
          className={"hero opacity-80 " + style.banner}
          style={{
            backgroundImage: `url("${media.banner_image ?? ""}")`,
            backgroundColor: "#151f2e",
          }}
        >
          <div className={style.banner_shadow}></div>
          <div className="relative  container -mt-48 mx-auto  rounded-md p-5 sm:w-1/4">
            <Alert
              show={showError}
              message={message}
              seconds={3}
              setShowError={setShowError}
              type={"success"}
            />
          </div>
        </div>
        <Container>
          <div className="grid grid-rows-1 gap-8 md:grid-flow-col 2xl:px-24">
            <div className="m-auto sm:m-0 sm:-mt-28 z-30 w-fit">
              <MediaPageCard img={media.large_cover_image} />
              <div className=" flex flex-shrink gap-4 mt-3 ">
                <div
                  className={
                    "flex w-full px-1 justify-center items-center  rounded-l-md bg-primary-content cursor-pointer " +
                    style.custom_btn
                  }
                >
                  <label
                    onClick={(event) => {
                      if (isUserAuthenticated()) {
                        setShowError(false);
                        resetAlert();
                      } else {
                        setMessage("Unauthorized.");
                        setShowError(true);
                      }
                    }}
                    htmlFor={showError ? "" : "my-modal-4"}
                    className="text-white capitalize text-xs  cursor-pointer"
                  >
                    {status ? status : "Add to Library" /*TODO format string*/}
                  </label>
                </div>
                <div className={" " + style.custom_btn}>
                  <div
                    className="dropdown hover:bg-opacity-95 "
                    onClick={toggleDropdown}
                  >
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
                      className={`dropdown-content -left-11 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 ${
                        isShowMore ? "d-block" : "hidden"
                      }`}
                      onClick={toggleDropdown}
                    >
                      <li>
                        <a
                          onClick={(event) => {
                            if (isUserAuthenticated()) {
                              updateStatus("PLAN TO WATCH");
                            }
                          }}
                        >
                          Set as Planning
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(event) => {
                            if (isUserAuthenticated()) {
                              updateStatus("WATCHING");
                            }
                          }}
                        >
                          {type  === "ANIME"
                            ? " Set as Watching"
                            : "Set as Reading"}
                            {/* Le llega el type vacio */}
                        </a>
                      </li>
                      <li className="w-full border-t border-accent">
                        <label htmlFor="my-modal-4" className="">
                          Open List Editor
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  className="w-20 bg-rose-600 rounded-md "
                  onClick={handleFavorite}
                >
                  <BsFillHeartFill
                    className="text-white mx-auto hover:text-pink-100"
                    fill={favorite == 1 ? "#ffaebc" : "#ffff"}
                  />
                </button>
              </div>
            </div>
            <div className=" py-10 pr-8 text-left">
              <h2 className="2xl:text-3xl md:text-xl">{media.title}</h2>
              <p className={"mt-3 2xl:text-sm md:text-sm " + style.description}>
                <ReadMore>{media.description}</ReadMore>
              </p>
            </div>
            {/* <ReadMoreToggle media={media}/> */}
          </div>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />

          <MediaEditor
            user={user_id}
            media={media}
            actualStatus={status}
            updateStatus={updateStatus}
          />
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

export default MediaHeader;
