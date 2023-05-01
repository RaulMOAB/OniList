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
import ReadMoreToggle from "../../components/utils/ReadMoreToggle";
import SubmitButton from "../Buttons/AuthForms/SubmitButton";
import Alert from "@/components/Alerts/Alert";
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

function MediaHeader() {
  const router = useRouter();
  const { getUserID, isUserAuthenticated } = useContext(AuthContext);
  const { id } = router.query;
  const [media, setMedia] = useState();
  const user_id = getUserID();
  const [subscribe, isSubsribed] = useState([]);
  const [status, setStatus] = useState(subscribe[0]);

  //*Alert state
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const [isShowMore, setIsShowMore] = useState(true);

  useEffect(() => {
    getMedia(id)
      .then((res) => {
        setMedia(res);
        getMediaSubscribed(user_id, id).then((res) => {
          isSubsribed(res);
          if (res[0]) {
            setStatus(res[0].status);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  //TODO hashMap con los status de las medias
  const updateStatus = async (status) => {
    setStatus(status); // cambia el texto del boton
    const body = JSON.stringify({
      user_id,
      id,
      status,
    });

    const response = await fetch(`http://127.0.0.1:8000/api/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    if (response.status === 200) {
      setMessage(`${media.title} added to ${status} list.`);
      setShowError(true);
    }
    //TODO alternative way?
    //router.reload();
    return response.json();
  };

  const toggleDropdown = () => {
    setIsShowMore(!isShowMore);
  };

  const resetAlert = () => {
    setShowError(false);
  };

  if (media) {
    //if media is not undefined
    return (
      <>
        <div
          className={"hero opacity-80 " + style.banner}
          style={{
            backgroundImage: `url("${media.banner_image}")`,
          }}
        >
          <div className={style.banner_shadow}></div>
          <div className="relative  container -mt-48 mx-auto  rounded-md p-5 sm:w-full">
            <Alert
              show={showError}
              message={message}
              resetAlert={resetAlert}
              type={""}
            />
          </div>
        </div>
        <Container>
          <div className="grid grid-rows-1 gap-8 grid-flow-col 2xl:px-24">
            <div className="-mt-28 z-30 w-fit">
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
                        // updateStatus("PLAN TO WATCH");
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
                          Set as Watching
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
                <button className="w-20 bg-rose-600 rounded-md ">
                  <BsFillHeartFill className="text-white mx-auto hover:text-pink-100" />
                </button>
              </div>
            </div>
            <div className="py-10 text-left">
              <h2 className="2xl:text-3xl">{media.title}</h2>
              <p className={"mt-3 2xl:text-sm " + style.description}>
                {media.description}
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
          <div className="mx-auto text-center">
            <p>NAVBAR</p>
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

export default MediaHeader;