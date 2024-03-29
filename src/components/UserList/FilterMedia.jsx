/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";


/**
 * type: specify the type to change some values that are anime or manga only.
 * medias: all medias arriving from animelist.jsx or mangalist.jsx 
 * setFilteredMedia: function to change filteredMedia from animelist.jsx or mangalist.jsx
 *  
 * @param {string} type
 * @param {object} medias
 * @param {function} setFilteredMedia
 * @returns 
 */
export default function FilterMedia({ type, medias, setFilteredMedia }) {
	const [format, setFormat] = useState("");
	const [status, setStatus] = useState("");
	const [genre, setGenre] = useState("");
	const [search, setSearch] = useState("");
	const [filteredMedia, setMedias] = useState(medias);
	const [formatSelectedOption, setFormatSelectedOption] = useState("");
	const [statusSelectedOption, setStatusSelectedOption] = useState("");
	const [genresSelectedOption, setGenreSelectedOption] = useState("");

	/**
	 * If user click some type of list, for example; "all" will reset all filters.
	 *
	 * @param {string} listType
	 */
	const updateList = (listType) => {
		if (listType === "all") {
			setFilteredMedia(filteredMedia);
			setStatus("");
			setFormat("");
			setGenre("");
			setSearch("");
			setFormatSelectedOption("");
			setStatusSelectedOption("");
			setGenreSelectedOption("");
		} else {
			//will show only selected listType, like COMPLETED, WATCHING, PAUSED...
			let selected_list = medias.filter((media) => {
				return media.status.status === listType;
			});
			setFilteredMedia(selected_list);
			setFormatSelectedOption("");
			setStatusSelectedOption("");
			setGenreSelectedOption("");
			setSearch("");
		}
	};

	//Get all medias status, example ['PAUSED','PAUSED','COMPLETED'...]
	const user_lists = medias.map((media) => {
		return media.status.status;
	});

	//Get object with each status and numbers of the medias that are in this status, example:
	//{PAUSED:2 COMPLETED:4, WATCHING:5...}
	const item_list_counter = user_lists.reduce((acc, elem) => {
		acc[elem] = (acc[elem] || 0) + 1;
		return acc;
	}, {});

	let list_buttons = [];

	let index = 0;

	//Set listTypes and each numbers of medias
	for (let key in item_list_counter) {
		let manga_key = "READING";
		if (type === "MANGA") {
			switch (key) {
				case "WATCHING":
					manga_key = "READING";
					break;
				case "REWATCHING":
					manga_key = "REREADING";
					break;
				case "PLAN TO WATCH":
					manga_key = "PLAN TO READ";
					break;
				default:
					manga_key = key;
					break;
			}
		}
		list_buttons.push(
			<button
				value={key}
				key={index}
				onClick={() => {
					updateList(key);
				}}
				className='bg-base-300 w-full text-left px-2 rounded-md text-sm py-1 mb-1 flex justify-between hover:opacity-70'>
				<span className='mr-2'>{type === "MANGA" ? manga_key : key}</span>
				<span className='text-right'>{item_list_counter[key]}</span>
			</button>
		);
		index++;
	}

	//Initialize options selects and create the options arrays (some options depends on the type of media)
	const status_array = [
		"Finished",
		"Releasing",
		"Not Yet Released",
		"Cancelled",
	];
	const status_options = [];
	status_array.forEach((item, index) => {
		status_options.push(
			<option
				key={index}
				value={item}>
				{item}
			</option>
		);
	});
	const formats =
		type === "ANIME"
			? ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"]
			: ["Manga", "Light Novel", "One Shot"];
	const formats_options = [];
	formats.forEach((media_format, index) => {
		formats_options.push(
			<option
				key={index}
				value={media_format}>
				{media_format}
			</option>
		);
	});
	const genres = [
		"Action",
		"Adventure",
		"Comedy",
		"Drama",
		"Ecchi",
		"Fantasy",
		"Horror",
		"Mahou Shoujo",
		"Mecha",
		"Music",
		"Mystery",
		"Psychological",
		"Romance",
		"Sci-Fi",
		"Slice of Life",
		"Sports",
		"Supernatural",
		"Thriller",
	];

	const genres_options = [];
	genres.forEach((genre, index) => {
		genres_options.push(
			<option
				key={index}
				value={genre}>
				{genre}
			</option>
		);
	});

	/**
	 * user_search is what the user is typing in the search input.
	 * @param {string} user_search
	 */
	const handleSearchOnChange = (user_search) => {
		setSearch(user_search.toLowerCase());
	};

	/**
	 * media_status is what the user select in the status input select.
	 * @param {string} media_status
	 */
	const handleStatusOnChange = (media_status) => {
		if (media_status !== "Status") {
			setStatus(media_status.toLowerCase().replaceAll(" ", "_"));
			setStatusSelectedOption(media_status);
		}
	};

	/**
	 * media_format is what the user select in the format input select.
	 * @param {string} media_format
	 */
	const handleFormatOnChange = (media_format) => {
		setFormat(media_format.toLowerCase().replaceAll(" ", "_"));
		setFormatSelectedOption(media_format);
	};

	/**
	 * media_genre is what the user select in the genres input select.
	 * @param {string} media_genre
	 */
	const handleGenreOnChange = (media_genre) => {
		setGenre(media_genre.toLowerCase());
		setGenreSelectedOption(media_genre);
	};


	/**
	 * This function filter for each media and verify if  they match with the state of:
	 * search,status,format and genre.
	 * then save the results in aux_filtered_medias to set Medias and filteredMedias from  animelist.jsx and mangalist.
	 */
	const filter = () => {
		let aux_filtered_medias = medias.filter((media) => {
			let title = media.media.title;
			let media_title = title.toLowerCase();
			let media_format = media.media.format.toLowerCase();
			let media_genres_json = media.media.genres;
			let media_genres_array = JSON.parse(media_genres_json);
			let media_genres_formatted = media_genres_array.map((g) => {
				return g.toLowerCase().replaceAll(" ", "_");
			});
			let media_status = media.media.airing_status.toLowerCase();
			return (
				(media_title.includes(search) || search === "") &&
				(media_status === status || status === "") &&
				(media_format === format || format === "") &&
				(media_genres_formatted.includes(genre) || genre === "")
			);
		});

		setMedias(aux_filtered_medias);
		setFilteredMedia(aux_filtered_medias);
	};

	/**
	 * if some state changes the filter function will be executed.
	 */
	useEffect(() => {
		setMedias(medias);
		filter();
	}, [search, status, format, genre, medias]);

	return (
		<div className='p-3'>
			<div className='mb-3'>
				<label className='flex justify-center rounded-md input-group input-group-md text-md'>
					<span className='bg-base-300 w-10 px-2'>
						<AiOutlineSearch className='text-lg text-accent' />
					</span>
					<input
						type='email'
						onChange={(event) => handleSearchOnChange(event.target.value)}
						placeholder='Search'
						value={search}
						className={
							"w-full h-12 focus:outline-none bg-base-300  text-accent font-semibold p-3"
						}
					/>
				</label>
			</div>

			<div className='mb-3'>
				<div>
					<small className='text-accent'>Lists</small>
				</div>
				<button
					onClick={() => {
						updateList("all");
					}}
					className='bg-base-300 w-full text-left px-2 rounded-md text-sm py-1 mb-1 flex justify-between hover:opacity-70'>
					<span className='mr-2'>All</span>
					<span className='text-right'>{user_lists.length}</span>
				</button>
				{list_buttons}
			</div>

			<div className='mb-3'>
				<small className='text-accent'>Filters</small> <br />
				<select
					value={formatSelectedOption}
					className='select w-full mb-1 bg-base-300'
					onChange={(event) => {
						handleFormatOnChange(event.target.value);
					}}>
					<option
						value={""}
						defaultChecked>
						Format
					</option>
					{formats_options}
				</select>
				<select
					value={statusSelectedOption}
					className='select w-full mb-1 bg-base-300'
					onChange={(event) => {
						handleStatusOnChange(event.target.value);
					}}>
					<option
						value={""}
						defaultChecked>
						Status
					</option>
					{status_options}
				</select>
				<select
					value={genresSelectedOption}
					className='select w-full mb-1 bg-base-300 overflow-auto'
					onChange={(event) => {
						handleGenreOnChange(event.target.value);
					}}>
					<option
						value={""}
						defaultChecked>
						Genres
					</option>
					{genres_options}
				</select>
			</div>
		</div>
	);
}
