import { React, use, useState } from "react";
import style from "../../styles/Banner.module.css";
import { BsFillHeartFill } from "react-icons/bs";
import MediaPageCard from "@/components/Card/MediaPageCard";
import ConfirmModal from "../Modals/ConfirmModal";
import moment from "moment";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

function MediaEditor({ media,actualStatus, updateStatus }) {
	const { user, fetchData } = useContext(AuthContext);
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
		if(media_id){
			const endpoint = `status/${user.id}/${media_id}`;
			fetchData(endpoint).then((res) => {
				console.log(res)
					setStatus(res.status ?? "");
					setRating(res.rate ?? 0);
					setStartDate(res.start_date ?? "");
					setEndDate(res.end_date ?? "");
					setProgress(res.progress) ?? 0;
					setRewatches(res.rewatches ?? 0);
					setNotes(res.notes ?? "");
			});
		}
	}, [media,actualStatus]);

	let stars_array = [];

	const saveMediaData = async () => {
		const body = JSON.stringify({
			user: user.id,
			media_id: media.id,
			status: status ?? "WATCHING",
			rate,
			progress,
			start_date: startDate,
			endDate,
			rewatches,
			notes,
		});

		// console.log(body);
		// console.log(startDate);
		// console.log(endDate);
		const endpoint = "media/data";
		const method = "POST";
		fetchData(endpoint, method, body).then((res) => {
			console.log(res);
		});
		//return response.json();
	};

	const deleteMedia = async (media_id) => {
		const endpoint = "media/delete/" + media_id;
		const method = "DELETE";

		fetchData(endpoint, method).then((res) => {
			console.log(res);
		});
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
		//console.log(Number(rating.target.defaultValue));
		return setRating(Number(rating.target.defaultValue));
	};

	const getOptionValue = (defaultValue) => {
    let selected_status = defaultValue.target.value;
    if (selected_status !== "COMPLETED" || selected_status !== "PAUSED" || rewatches === 0) {
      setRating(0);
		}
		if (selected_status === "WATCHING") {
      if(startDate === ""){
        setStartDate(getCurrentDate);
      }
      if(progress === media.episodes){
        setProgress(0);
      }
		}
		if (selected_status === "COMPLETED") {
			setEndDate(getCurrentDate);
      setProgress(media.episodes)
      if (getCurrentDate() < startDate) {
				setStartDate("");
			}
		}
		if (selected_status === "PLAN TO WATCH") {
			resetForm();
		}
		setStatus(selected_status);
	};

	const getCurrentDate = () => {
		let date = moment();
		const currentDate = date.format("YYYY-MM-DD");
		//console.log(currentDate);
		return currentDate;
	};

	// const formatDate = (date) => {
	//   const format = moment(date).format("YYYY-MM-DD");
	//   console.log(format);
	//   return format;
	// };

	const handleStartDateSelected = (date) => {
    let selected_date = date.target.value;
    if(selected_date > endDate){
      setEndDate("");
    }
		setStartDate(selected_date);
	};

	const handleEndDateSelected = (date) => {

    let selected_date = date.target.value;
    if (selected_date < startDate){
      setStartDate("");
    }
    setEndDate(selected_date);
	};

	const handleEpisodeChange = (episode) => {
		return setProgress(Number(episode.target.value));
	};

	const handleRewatchesChange = (rewatches) => {
		return setRewatches(Number(rewatches.target.value));
	};

	const handleNotesChange = (notes) => {
		//console.log(notes.target.defaultValue);
		return setNotes(notes.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (clicked === "SAVE") {
			saveMediaData();
  		updateStatus(status);

		} else {
			deleteMedia(media.id);
		}
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
    console.log(rate)
    let enable = (status === "REWATCHING" || status === "COMPLETED" || rewatches > 0) 
		for (let index = 0; index < 6; index++) {
					stars_array.push(
						<input
							type='radio'
							name='rating-2'
              disabled={!enable}
							className={
								index !== 0
									? "mask mask-star-2 bg-orange-400 "
									: "rating-hidden"
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
					className={"hero opacity-80 justify-start " + style.banner_modal}
					style={{
						backgroundImage: `url("${media.banner_image}")`,
					}}>
					<div className={style.banner_shadow}></div>

					<div className='flex z-30 mt-20 mx-8 w-fit'>
						<MediaPageCard img={media.medium_cover_image} />

						<div className='flex justify-around'>
							<h2 className='text-white text-lg py-14 px-8  inline-block'>
								{media.title}
							</h2>
						</div>
						<div className='flex justify-end items-center'>
							<div className=''>
								<BsFillHeartFill className='text-white ' />
								{/*TODO cambiar color al hacer click */}
							</div>
						</div>
					</div>
				</div>
				<div>
					<form
						className='mt-20 m-10'
						onSubmit={(event) => handleSubmit(event)}>
						<div className='flex flex-nowrap mt-5 mb-6'>
							<div className='w-full md:w-1/5 px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Status
								</label>
								<select
                 onChange={getOptionValue}
                value={status}
                className='select select-sm w-full max-w-xs font-normal text-xs rounded-md bg-neutral text-slate-400'>
									<option
										value=''>
										Status
									</option>
									{mediaStatus.map((item, i) => (
										<option
											key={i}
											value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div className='w-full md:w-1/5 px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Score
								</label>
								<div className='flex rating'>{stars_array}</div>
							</div>
							<div className='w-full md:w-1/5 px-1 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Episode Progress
								</label>
								<input
									className='appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight '
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
							<div className='w-1/5 px-3'>
								<label
									className='block  tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-startDate'>
									Start Date
								</label>
								<input
									className='appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight text-xs'
									value={startDate}
									disabled={status === "PAUSED" || status === "DROPPED"}
									onChange={handleStartDateSelected}
									type='date'
									max={endDate ?? ""}
								/>
							</div>
							<div className='w-1/5 px-3'>
								<label
									className='block  tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-finishDate'>
									Finish Date
								</label>
								<input
									className='appearance-none block w-full text-gray-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight text-xs'
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
							<div className='w-full md:w-1/5 px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-first-name'>
									Total Rewatches
								</label>
								<input
									className='appearance-none block w-full text-slate-400 rounded-md bg-neutral py-2 px-4 mb-3 leading-tight '
									type='number'
									min={0}
									disabled={
										status === "PAUSED" ||
										status === "DROPPED"
									}
									defaultValue={rewatches === 0 ? "" : rewatches}
									onChange={handleRewatchesChange}
								/>
							</div>
						</div>

						<div className='flex flex-wrap mb-2'>
							<div className='w-full md:w-3/5 px-3 mb-6 md:mb-0'>
								<label
									className='block tracking-wide text-gray-400 text-xs font-normal mb-2'
									htmlFor='grid-city'>
									Notes
								</label>
								<textarea
									className='textarea textarea-bordered  w-full '
									placeholder='Write a note'
									value={notes}
									onChange={handleNotesChange}></textarea>
							</div>
						</div>
						<div className='flex justify-end'>
							<div className='px-4'>
								<label
									htmlFor='my-modal-4'
									className='btn py-2 px-4  bg-primary text-white font-normal  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent hover:bg-primary transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base'>
									<button
										type='submit'
										onClick={() => {
											setClicked("SAVE");
										}}
										className='px-2 '>
										<label
											htmlFor='my-modal-4'
											className=''>
											Save
										</label>
									</button>
								</label>
								<label
									htmlFor='my-modal-4'
									className='cursor-pointer hover:text-primary text-lg absolute right-6 top-4'>
									✕
								</label>
							</div>
							<button
								type='submit'
								onClick={() => {
									setClicked("DELETE");
								}}
								className='py-2 px-4 bg-error text-white font-normal  rounded-md shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base'>
								<label htmlFor='confirm-delete'>Delete</label>
							</button>
						</div>
						{/* <ConfirmModal
              id={"confirm-delete"}
              header={"Warning"}
              message={"Are you sure you want to delete this list entry?"}
              confirm_button_text="Delete, Cancel"
              action={handleSubmit}
            /> */}
					</form>
				</div>
			</label>
		</label>
	);
}

export default MediaEditor;
