import { React, use, useState } from "react";
import style from "../../styles/Banner.module.css";
import { BsFillHeartFill } from "react-icons/bs";
import MediaPageCard from "@/components/Card/MediaPageCard";
import moment from "moment";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

function MediaEditor({ media, actualStatus, updateStatus }) {
  const { user, fetchData } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [rate, setRating] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [rewatches, setRewatches] = useState(0);
  const [notes, setNotes] = useState("");

  // useEffect(() => {
  //   setStatus(actualStatus);
  // }, [actualStatus, status]);

  const saveMediaData = async (
    user,
    media_id,
    status,
    rate,
    progress,
    startDate,
    endDate,
    rewatches,
    notes
  ) => {
    const body = JSON.stringify({
      user,
      media_id,
      status: actualStatus,
      rate,
      progress,
      startDate,
      endDate,
      rewatches,
      notes,
    });
    console.log(body);
    const endpoint = "http://127.0.0.1:8000/api/media/data";
    const method = "POST";
    // const response = await fetch("http://127.0.0.1:8000/api/media/data", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body,
    // });

    fetchData(endpoint, method, body).then((res) => {
      console.log(res);
    });
    //return response.json();
  };

  const mediaStatus = [
    "WATCHING",
    "PLAN TO WATCH",
    "COMPLETED",
    "REWATCHING",
    "PAUSED",
    "DROPPED",
  ];
  const handleClick = (rating) => {
    console.log(Number(rating.target.value));
    return setRating(Number(rating.target.value));
  };

  const getOptionValue = (value) => {
    setStatus(value.target.value);
    updateStatus(value.target.value);
    if (value.target.value === "WATCHING") {
      setStartDate(getCurrentDate);
    } else if (value.target.value !== "COMPLETED") {
      setStartDate("");
    }

    if (value.target.value === "COMPLETED") {
      setEndDate(getCurrentDate);
    }
  };

  const getCurrentDate = () => {
    let date = moment();
    const currentDate = date.format("YYYY-MM-DD");
    return currentDate;
  };

  const handleOnChange = (date) => {
    setStartDate(date.target.value);
  };

  const handleEpisodeChange = (episode) => {
    console.log(setProgress(Number(episode.target.value)));
    return setProgress(Number(episode.target.value));
  };

  const handleRewatchesChange = (rewatches) => {
    console.log(rewatches.target.value);
    return setRewatches(Number(rewatches.target.value));
  };

  const handleNotesChange = (notes) => {
    console.log(notes.target.value);
    return setNotes(notes.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    saveMediaData(
      user.id,
      media.id,
      status,
      rate,
      progress,
      startDate,
      endDate,
      rewatches,
      notes
    );
  };
  return (
    <label htmlFor="my-modal-4" className="modal bg-opacity-80 cursor-pointer">
      <label
        className={
          "modal-box relative w-11/12 max-w-5xl rounded-none " +
          style.modal_editor
        }
        htmlFor=""
      >
        <div
          className={"hero opacity-80 justify-start " + style.banner_modal}
          style={{
            backgroundImage: `url("${media.banner_image}")`,
          }}
        >
          <div className={style.banner_shadow}></div>

          <div className="flex z-30 mt-20 mx-8 w-fit">
            <MediaPageCard img={media.medium_cover_image} />

            <div className="flex justify-around">
              <h2 className="text-white text-lg py-14 px-8  inline-block">
                {media.title}
              </h2>
            </div>
            <div className="flex justify-end items-center">
              <div className="">
                <BsFillHeartFill className="text-white " />{" "}
                {/*TODO cambiar color al hacer click */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <form
            className="mt-20 m-10"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex flex-nowrap mt-5 mb-6">
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Status
                </label>
                <select
                  className="select select-sm w-full max-w-xs font-normal text-xs  rounded-md bg-neutral text-slate-400"
                  value={actualStatus}
                >
                  {mediaStatus.map((item, i) => (
                    <option key={i} value={item} onClick={getOptionValue}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Score
                </label>
                <div className="flex rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    value={1}
                    onClick={handleClick}
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={handleClick}
                    value={2}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={handleClick}
                    value={3}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={handleClick}
                    value={4}
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={handleClick}
                    value={5}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Episode Progress
                </label>
                <input
                  className="appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight "
                  type="number"
                  min={0}
                  max={media.episodes}
                  onChange={handleEpisodeChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap  mb-6">
              <div className="w-1/5 px-3">
                <label
                  className="block  tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-startDate"
                >
                  Start Date
                </label>
                <input
                  className="appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight text-xs"
                  type="date"
                  value={startDate}
                  onChange={handleOnChange}
                />
              </div>
              <div className="w-1/5 px-3">
                <label
                  className="block  tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-finishDate"
                >
                  Finish Date
                </label>
                <input
                  className="appearance-none block w-full text-gray-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight text-xs"
                  value={endDate}
                  onChange={handleOnChange}
                  type="date"
                />
              </div>
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Total Rewatches
                </label>
                <input
                  className="appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight "
                  type="number"
                  min={0}
                  onChange={handleRewatchesChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-2">
              <div className="w-full md:w-3/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-400 text-xs font-normal mb-2"
                  htmlFor="grid-city"
                >
                  Notes
                </label>
                <textarea
                  className="textarea textarea-bordered  w-full "
                  placeholder="Write a note"
                  onChange={handleNotesChange}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4">
                <label htmlFor="my-modal-4" className="btn py-2 px-4  bg-primary text-white font-normal  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent hover:bg-primary transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base">
                  <button className="px-2 ">
                    Save
                  </button>
                </label>
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
              </div>
              <button className="py-2 px-4 bg-error text-white font-normal  rounded-md shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base">
                Delete
              </button>
            </div>
          </form>
        </div>
      </label>
    </label>
  );
}

export default MediaEditor;
