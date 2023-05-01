import React from "react";
import style from "../../styles/Banner.module.css";
import { BsFillHeartFill } from "react-icons/bs";
import MediaPageCard from "@/components/Card/MediaPageCard";


function MediaEditor({ media, status }) {
  const mediaStatus = [
    "WATCHING",
    "PLAN TO WATCH",
    "COMPLETED",
    "REWATCHING",
    "PAUSED",
    "DROPPED",
  ];
  const handleClick = (rating) => {
    console.log(rating.target.value);
    return rating.target.value;
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

          <div className="flex z-30 w-fit">
            <MediaPageCard img={media.medium_cover_image} />

            <div className="flexjustify-around">
              <h2 className="py-10 grow  inline-block">{media.title}</h2>
              <div className="flex items-center ">
                <BsFillHeartFill />
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="m-10">
            <div className="flex flex-nowrap mt-5 mb-6">
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Status
                </label>
                <select
                  className="select select-sm w-full max-w-xs font-normal text-xs"
                  value={status}
                >
                  {mediaStatus.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-normal mb-2"
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
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Episode Progress
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  min={0}
                  max={media.episodes}
                />
              </div>
            </div>
            <div className="flex flex-wrap  mb-6">
              <div className="w-1/5 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-startDate"
                >
                  Start Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="date"
                />
              </div>
              <div className="w-1/5 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-finishDate"
                >
                  Finish Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="date"
                />
              </div>
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Total Rewatches
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  min={0}
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-2">
              <div className="w-full md:w-3/5 px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-normal mb-2"
                  htmlFor="grid-city"
                >
                  Notes
                </label>
                <textarea
                  className="textarea textarea-bordered  w-full "
                  placeholder="Write a note"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4">
                <button className="py-2 px-4 bg-primary text-white font-normal  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  Save
                </button>
              </div>
              <button className="py-2 px-4 bg-error text-white font-normal  rounded-md shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
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
