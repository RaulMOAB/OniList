/* eslint-disable react-hooks/exhaustive-deps */
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
import Head from "next/head";
import Link from "next/link";

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
	const [favoriteChanged, setHasFavoriteChanged] = useState(false);
	const [type, setType] = useState("");

	//Alert state
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");

	//Dropdown state
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		let aux_type, aux_favorite;
		if (id) {
			getMedia(id)
				.then((res) => {
					if(Object.keys(res).length === 0){
						router.push("/404")
					}else{
						setMedia(res);
					}
					aux_type = res.type;
					setType(aux_type);
					getMediaSubscribed(user_id, id).then((res) => {
						isSubsribed(res);
						if (res) {
							aux_type = filterByMediaType(aux_type, res.status);
							aux_favorite = res.favorite;
							setType(aux_type ?? "");
							setStatus(aux_type);
							setFavorite(aux_favorite ?? 0);
						}
					});
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [id]);

	/**
	 * Function that changes media status according to the passed media type
	 * @param {*} changed_status 
	 * @param {*} deleted boolean to check if media is deleted from user library
	 * @param {*} favorite boolean to check if it's on favorite
	 */
	const updateStatus = async (changed_status, deleted, favorite = 0) => {
		if (media.type === "MANGA") {
			switch (changed_status) {
				case "READING":
					changed_status = "WATCHING";
					break;
				case "REREADING":
					changed_status = "REWATCHING";
					break;
				case "PLAN TO READ":
					changed_status = "PLAN TO WATCH";
					break;
				default:
					changed_status = changed_status;
					break;
			}
		}
		const body = JSON.stringify({
			user_id,
			media_id: id,
			status: changed_status,
			favorite,
		});

		/**
		 * Api call function to update media status
		 */
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

		setFavorite(favorite);
		if (media.type === "MANGA") {
			switch (changed_status) {
				case "WATCHING":
					changed_status = "READING";
					break;
				case "REWATCHING":
					changed_status = "REREADING";
					break;
				case "PLAN TO WATCH":
					changed_status = "PLAN TO READ";
					break;
				default:
					changed_status = changed_status;
					break;
			}
		}
		setStatus(changed_status); // changes button text on media page
		if (deleted) {
			setMessage(`${media.title} was deleted from your library.`);
			setShowError(true);
			setFavorite(0);
			setType("success");
		} else {
			if (response.status === 200) {
				setMessage(`${media.title} added to ${changed_status} list.`);
				setShowError(true);
				setType("success");
			}
		}
	};
/**
 * Handle event function to set or unset favorite media
 * @param {*} event 
 */
	const handleFavorite = (event) => {
		event.preventDefault();
		let aux_fav;
		let aux_status = status == "Add to Library" ? "WATCHING" : status;

		if (favorite === 0) {
			aux_fav = 1;
			setFavorite(aux_fav);
			setFavoriteToMedia(aux_fav, aux_status);
		} else {
			aux_fav = 0;
			setFavorite(aux_fav);
			setFavoriteToMedia(aux_fav, aux_status);
		}
	};
/**
 * Api call to add or remove media favorite status 
 * @param {*} favorite 1 add favorite 0 remove favorite
 * @param {*} status actual media status 
 */
	const setFavoriteToMedia = async (favorite, status = "WATCHING") => {
		const body = JSON.stringify({
			user_id: user_id,
			media_id: id,
			status: status,
			favorite: favorite,
		});

		const endpoint = "media/favorite";
		const method = "POST";
		if (isUserAuthenticated()) {
			fetchData(endpoint, method, body);
			updateStatus(status, false, favorite ?? 1);
			setHasFavoriteChanged(!favoriteChanged);
		}
	};


	const resetAlert = () => {
		setShowError(false);
	};

	if (media) {
		return (
			<>
				<Head>
					<title>{media.title} · Onilist</title>
				</Head>
				<div
					className={"hero opacity-80 " + style.banner}
					style={{
						backgroundImage: `url("${media.banner_image ?? ""}")`,
						backgroundColor: "#151f2e",
					}}>
					<div className={style.banner_shadow}></div>
					<div className='relative  container -mt-48 mx-auto  rounded-md p-5 sm:w-1/4'>
						<Alert
							show={showError}
							message={message}
							seconds={3}
							setShowError={setShowError}
							type={type}
						/>
					</div>
				</div>
				<Container>
					<div className='grid grid-rows-1 gap-8 md:grid-flow-col 2xl:px-24'>
						<div className='m-auto -mt-44 sm:m-0 sm:-mt-28 z-30 w-fit'>
							<Link href={`/${media.type.toLowerCase()}/${media.id}`}>
								<MediaPageCard img={media.large_cover_image} />
							</Link>
							<div className=' flex flex-shrink gap-4 mt-3 '>
								<div
									className={
										"flex w-full px-1 justify-center items-center  rounded-l-md bg-primary-content cursor-pointer " +
										style.custom_btn
									}>
									<label
										onClick={(event) => {
											if (isUserAuthenticated()) {
												setShowError(false);
												resetAlert();
											} else {
												setMessage("Unauthorized.");
												setType("error");
												setShowError(true);
											}
										}}
										htmlFor={showError ? "" : "my-modal-4"}
										className='text-white capitalize text-xs  cursor-pointer'>
										{status ? status : "Add to Library"}
									</label>
								</div>
								<div className={" " + style.custom_btn}>
									<div
										className='dropdown hover:bg-opacity-95 '
										onClick={() => setIsOpen(!isOpen)}>
										<label
											tabIndex={0}
											className={
												"flex -mx-8 w-8 justify-center items-center  bg-primary-content hover:bg-primary rounded-none border-none rounded-r-md cursor-pointer " +
												style.custom_btn
											}>
											<svg
												className='fill-current text-white'
												xmlns='http://www.w3.org/2000/svg'
												width='20'
												height='20'
												viewBox='0 0 24 24'>
												<path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
											</svg>
										</label>
										{/* if users is not subscribe */}
										<ul
											tabIndex={0}
											className={`dropdown-content -left-11 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 ${
												isOpen ? "d-block" : "hidden"
											}`}
											onClick={() => setIsOpen(!isOpen)}>
											<li>
												<a
													onClick={(event) => {
														if (isUserAuthenticated()) {
															updateStatus("PLAN TO WATCH");
														}
													}}>
													Set as Planning
												</a>
											</li>
											<li>
												<a
													onClick={(event) => {
														if (isUserAuthenticated()) {
															updateStatus("WATCHING");
														}
													}}>
													{media.type === "ANIME"
														? " Set as Watching"
														: "Set as Reading"}
												</a>
											</li>
											<li className='w-full border-t border-accent'>
												<label
													onClick={() => {
														if (!isUserAuthenticated()) {
															setMessage("Unauthorized.");
															setType("error");
															setShowError(true);
														}
													}}
													htmlFor='my-modal-4'>
													Open List Editor
												</label>
											</li>
										</ul>
									</div>
								</div>
								<button
									className='w-20 bg-rose-600 rounded-md '
									onClick={(event) => {
										if (!isUserAuthenticated()) {
											setMessage("Unauthorized.");
											setType("error");
											setShowError(true);
										} else {
											handleFavorite(event);
										}
									}}>
									<BsFillHeartFill
										className='text-white mx-auto hover:text-pink-100'
										fill={favorite == 1 ? "#ffaebc" : "#ffff"}
									/>
								</button>
							</div>
						</div>
						<div className='sm:p-0 sm:py-10 sm:pr-8 text-left '>
							<div className='bg-neutral p-5 sm:p-0 sm:bg-transparent'>
								<h2 className='text-2xl 2xl:text-3xl md:text-xl'>
									{media.title}
								</h2>
								<p
									className={
										"mt-3 2xl:text-sm md:text-sm " + style.description ?? ""
									}>
									<ReadMore>{media.description ?? ""}</ReadMore>
								</p>
							</div>
						</div>
					</div>
					<input
						type='checkbox'
						id='my-modal-4'
						className='modal-toggle'
					/>
					{isUserAuthenticated() && (
						<MediaEditor
							media={media}
							actualStatus={status}
							updateStatus={updateStatus}
							hasFavoriteChanged={favoriteChanged}
						/>
					)}
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
