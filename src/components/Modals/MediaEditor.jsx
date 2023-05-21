/* eslint-disable react-hooks/exhaustive-deps */
import { React, use, useState } from "react";
import style from "../../styles/Banner.module.css";
import { BsFillHeartFill } from "react-icons/bs";
import MediaPageCard from "@/components/Card/MediaPageCard";
import ConfirmModal from "../Modals/ConfirmModal";
import moment from "moment";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

function MediaEditor({ media, actualStatus, updateStatus ,hasFavoriteChanged }) {
  const { user, fetchData } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState("");
  const [rate, setRating] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [rewatches, setRewatches] = useState(0);
  const [notes, setNotes] = useState("");
  const [clicked, setClicked] = useState("");
  const [mediaState, setMediaState] = useState([]);

  useEffect(() => {
    let media_id = media.id ?? media.media_id;
    if (media_id) {
      const endpoint = `status/${user.id}/${media_id}`;
      fetchData(endpoint).then((res) => {
            let aux_status;
						if (media.type === "MANGA") {
							switch (res.status) {
								case "WATCHING":
									aux_status = "READING";
									break;
								case "REWATCHING":
									aux_status = "REREADING";
									break;
								case "PLAN TO WATCH":
									aux_status = "PLAN TO READ";
									break;
								default:
                aux_status=res.status;
									break;
							}
						}else{
              aux_status = res.status;
            }
        setStatus(aux_status ?? "");
        setRating(res.rate ?? 0);
        setStartDate(res.start_date ?? "");
        setEndDate(res.end_date ?? "");
        setProgress(res.progress) ?? 0;
        setRewatches(res.rewatches ?? 0);
        setNotes(res.notes ?? "");
        if (res.favorite==1) {
          setIsFavorite(res.favorite);
				}else{
          setIsFavorite(false);
        }
      });
    }
  }, [media, actualStatus, hasFavoriteChanged]);

  let stars_array = [];

  const saveMediaData = async () => {
    let media_id = media.id ?? media.media_id;
    let aux_status = status;
    
    if (media.type === "MANGA") {
      switch (status) {
				case "READING":
					aux_status = "WATCHING";
					break;
				case "REREADING":
					aux_status = "REWATCHING";
					break;
				case "PLAN TO READ":
					aux_status = "PLAN TO WATCH";
					break;
				default:
					aux_status = status;
					break;
			}
    }
    console.log(aux_status);
		let favorite = isFavorite ? 1:0;
    const body = JSON.stringify({
      user: user.id,
      media_id,
      status: aux_status ?? "WATCHING",
      rate,
      progress,
      start_date: startDate,
      endDate,
      favorite,
      rewatches,
      notes,
    });
    const endpoint = "media/data";
    const method = "POST";
    fetchData(endpoint, method, body).then((res) => {
      updateStatus(aux_status, false, favorite);
    });

    //return response.json();
  };
  const handleFavorite = ()=>{
    setIsFavorite(!isFavorite)
  }

  const deleteMedia = async () => {
    let media_id = media.id ?? media.media_id;
    const endpoint = "media/delete/" + media_id;
    const method = "DELETE";

    fetchData(endpoint, method).then((res) => {
      updateStatus("Add to Library", true);
    });
  };

  const mediaStatus = [
    media.type === "ANIME" ? "WATCHING" : "READING",
    media.type === "ANIME" ? "PLAN TO WATCH" : "PLAN TO READ",
    "COMPLETED",
    media.type === "ANIME" ? "REWATCHING" : "REREADING",
    "PAUSED",
    "DROPPED",
  ];
  const handleClick = (rating) => {
    //console.log(Number(rating.target.defaultValue));
    return setRating(Number(rating.target.defaultValue));
  };

  const getOptionValue = (defaultValue) => {
    let selected_status = defaultValue.target.value;
    setStatus(selected_status);
    if (media.type === "MANGA") {
      switch (selected_status) {
        case "READING":
          selected_status = "WATCHING";
          break;
        case "REREADING":
          selected_status = "REWATCHING";
          break;
        case "PLAN TO READ":
          selected_status = "PLAN TO WATCH";
          break;
        default:
          break;
      }
    }
    if (
      selected_status !== "COMPLETED" ||
      selected_status !== "PAUSED" ||
      rewatches === 0
    ) {
      setRating(0);
    }
    if (selected_status === "") {
      setStatus(media.type === "ANIME" ? "WATCHING" : "READING");
    }
    if (selected_status === "WATCHING") {
      if (startDate === "") {
        setStartDate(getCurrentDate);
      }
      if (progress === media.episodes) {
        setProgress(0);
      }
			if(rewatches>0){
				setRewatches(0);
			}
    }
		if(selected_status==="REWATCHING"){
			if(rewatches===0){
				setRewatches(1);
			}
		}
    if (selected_status === "COMPLETED") {
      setEndDate(getCurrentDate);
      setProgress(media.episodes);
      if (getCurrentDate() < startDate) {
        setStartDate("");
      }
    }
    if (selected_status === "PLAN TO WATCH") {
      resetForm();
    }
  };

  const getCurrentDate = () => {
    let date = moment();
    const currentDate = date.format("YYYY-MM-DD");
    //console.log(currentDate);
    return currentDate;
  };


  const handleStartDateSelected = (date) => {
    let selected_date = date.target.value;
    if (selected_date > endDate) {
      setEndDate("");
    }
    setStartDate(selected_date);
  };

  const handleEndDateSelected = (date) => {
    let selected_date = date.target.value;
    if (selected_date < startDate) {
      setStartDate("");
    }
    setEndDate(selected_date);
  };

  const handleEpisodeChange = (episode) => {
    return setProgress(Number(episode.target.value));
  };

  const handleRewatchesChange = (rewatches) => {

    if(media.type==="ANIME"){
      setStatus('REWATCHING')
    }else{
      setStatus("REREADING");
    }
    if (
			Number(rewatches.target.value) === 0 &&
			(status === "REREADING") | (status === "REWATCHING")
		) {
      setStatus('');
		}
    return setRewatches(Number(rewatches.target.value));
  };

  const handleNotesChange = (notes) => {
    //console.log(notes.target.defaultValue);
    return setNotes(notes.target.value);
  };

  const resetForm = () => {
    setRating(0);
    setStartDate("");
    setEndDate("");
    setProgress(0);
    setRewatches(0);
  };
  // Set stars rating when page is reloaded or changed
  if (rate >= 0) {
    //console.log(rate);
    let enable =
      status === "REWATCHING" || status === "COMPLETED" || rewatches > 0 || status==="REREADING";
    for (let index = 0; index < 6; index++) {
      stars_array.push(
        <input
          type="radio"
          name="rating-2"
          disabled={!enable}
          className={
            index !== 0 ? "mask mask-star-2 bg-orange-400 " : "rating-hidden"
          }
          key={index}
          value={index}
          onClick={handleClick}
          checked={rate === index}
        />
      );
    }
  }
  return (
		<label
			htmlFor='my-modal-4'
			className='modal bg-opacity-80 cursor-pointer'>
			<label
				className={
					"modal-box relative w-11/12 max-w-5xl rounded-none " +
					style.modal_editor
				}
				htmlFor=''>
				<div
					className={"relative flex hero opacity-80  " + style.banner_modal}
					style={{
						backgroundImage: `url("${media.banner_image}")`,
					}}>
					<div className={style.banner_shadow}></div>
					<div className='absolute w-full h-full bg-gradient-to-t from-black  opacity-60 top-0'></div>

					<div className='flex z-30 mt-28 mx-1 sm:mx-8 w-full'>
						<MediaPageCard img={media.medium_cover_image} />

						<div className='flex justify-around h-fit'>
							<h2 className='text-white text-lg p-2 sm:py-14 sm:px-8  inline-block'>
								{media.title}
							</h2>
						</div>
						<div className='flex flex-grow items-center justify-end'>
							<div className='px-5'>
								{isFavorite ? (
									<BsFillHeartFill
										onClick={handleFavorite}
										className='text-red-500 cursor-pointer'
									/>
								) : (
									<BsFillHeartFill
										onClick={handleFavorite}
										className='text-white cursor-pointer'
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className='mt-20 m-10'>
						<div className='flex md:flex-nowrap flex-wrap mt-5 mb-6'>
							<div className='w-1/2 md:w-1/5 sm:px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Status
								</label>
								<select
									onChange={getOptionValue}
									value={status}
									className='select select-sm w-full max-w-xs font-normal text-xs rounded-md bg-base-300 text-accent'>
									<option value=''>Status</option>
									{mediaStatus.map((item, i) => (
										<option
											key={i}
											value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div className='w-1/2 md:w-1/5 sm:px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Score
								</label>
								<div className='flex rating'>{stars_array}</div>
							</div>
							<div className='w-full md:w-1/5 sm:px-3 mb-0 md:mb-0'>
								<label
									className='block tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									{media.type === "ANIME"
										? "Episode Progress"
										: "Chapter progress"}
								</label>
								<input
									className='appearance-none block w-full text-accent rounded-md bg-base-300 py-2 px-4 mb-3 leading-tight '
									type='number'
									min={0}
									max={media.episodes}
									disabled={
										status === "COMPLETED" ||
										status === "PAUSED" ||
										status === "DROPPED"
									}
									value={progress}
									onChange={handleEpisodeChange}
								/>
							</div>
						</div>
						<div className='flex flex-wrap  mb-6'>
							<div className='lg:w-1/5 w-1/2 px-1 sm:px-3'>
								<label
									className='block  tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-startDate'>
									Start Date
								</label>
								<input
									className='appearance-none block w-full text-accent rounded-md bg-base-300 py-2 px-4 mb-3 leading-tight text-xs'
									value={startDate}
									disabled={status === "PAUSED" || status === "DROPPED"}
									onChange={handleStartDateSelected}
									type='date'
									max={endDate ?? ""}
								/>
							</div>
							<div className='lg:w-1/5 w-1/2 px-1 sm:px-3'>
								<label
									className='block  tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-finishDate'>
									Finish Date
								</label>
								<input
									className='appearance-none block w-full text-accent rounded-md bg-base-300 py-2 px-4 mb-3 leading-tight text-xs'
									disabled={
										status === "COMPLETED" ||
										status === "PAUSED" ||
										status === "DROPPED"
									}
									value={endDate}
									onChange={handleEndDateSelected}
									type='date'
									min={startDate ?? ""}
								/>
							</div>
							<div className='w-full md:w-1/5 sm:px-3 mb-0'>
								<label
									className='block tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									{media.type === "ANIME"
										? "Total Rewatches"
										: "Total Rereading"}
								</label>
								<input
									className='appearance-none block w-full text-accent rounded-md bg-base-300 py-2 px-4 mb-3 leading-tight '
									type='number'
									min={0}
									disabled={status === "PAUSED" || status === "DROPPED"}
									value={rewatches === 0 ? 0 : rewatches}
									onChange={handleRewatchesChange}
								/>
							</div>
						</div>

						<div className='flex flex-wrap mb-2'>
							<div className='w-full md:w-3/5 sm:px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-accent text-xs font-normal mb-2'
									htmlFor='grid-city'>
									Notes
								</label>
								<textarea
									className='textarea textarea-bordered bg-base-300  w-full '
									placeholder='Write a note'
									value={notes}
									onChange={handleNotesChange}></textarea>
							</div>
						</div>
						<div className='flex justify-end'>
							<div className='px-4'>
								<label htmlFor='my-modal-4'>
									<button
										onClick={() => {
											saveMediaData();
											let aux_status;
											if (media.type === "MANGA") {
												switch (aux_status) {
													case "READING":
														aux_status = "WATCHING";
														break;
													case "REREADING":
														aux_status = "REWATCHING";
														break;
													case "PLAN TO READ":
														aux_status = "PLAN TO WATCH";
														break;
													default:
														aux_status = status;
														break;
												}
											}
											updateStatus(aux_status, false);
										}}
										className=' py-2  bg-primary text-white font-normal  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent hover:bg-primary transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base'>
										<label
											className='py-3 px-4 cursor-pointer'
											htmlFor='my-modal-4'>
											Save
										</label>
									</button>
								</label>
								<label
									htmlFor='my-modal-4'
									className='cursor-pointer text-white hover:text-primary text-lg absolute right-6 top-4'>
									✕
								</label>
							</div>
							<button className='py-2 bg-secondary text-white font-normal  rounded-md shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base'>
								<label
									className='py-3 px-4 cursor-pointer'
									htmlFor='confirm-delete'
									>
										
									Delete
								</label>
							</button>
						</div>
						<ConfirmModal
						
							id={"confirm-delete"}
							header={"Warning"}
							message={"Are you sure you want to delete this list entry?"}
							confirm_button_text='Delete'
							cancel_button_text='Cancel'
							action={deleteMedia}
						/>
					</div>
				</div>
			</label>
		</label>
	);
}

export default MediaEditor;
