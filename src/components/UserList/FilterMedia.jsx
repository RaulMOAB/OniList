import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

export default function FilterMedia({ type, medias, setFilteredMedia }) {
	const [format, setFormat] = useState("");
	const [status, setStatus] = useState("");
	const [genre, setGenre] = useState("");
	const [search, setSearch] = useState("");
	const [filteredMedia, setMedias] = useState(medias);
	const [formatSelectedOption, setFormatSelectedOption] = useState("");
	const [statusSelectedOption, setStatusSelectedOption] = useState("");
	const [genresSelectedOption, setGenreSelectedOption] = useState("");
	const updateList = (list) => {
		if (list === "all") {
			setFilteredMedia(filteredMedia);
			setStatus("");
			setFormat("");
			setGenre("");
			setSearch("");
			setFormatSelectedOption("");
			setStatusSelectedOption("");
			setGenreSelectedOption("");
		} else {
			let selected_list = medias.filter((media) => {
				return media.status[0].status === list;
			});
			setFilteredMedia(selected_list);
			setFormatSelectedOption("");
			setStatusSelectedOption("");
			setGenreSelectedOption("");
		}
	};

	const user_lists = medias.map((media) => {
		return media.status[0].status;
	});

	const item_list_counter = user_lists.reduce((acc, elem) => {
		//TODO
		acc[elem] = (acc[elem] || 0) + 1;
		return acc;
	}, {});

	let list_buttons = [];

	let index = 0;
	for (let key in item_list_counter) {
		let manga_key = "READING";
		if (type === "MANGA") {
			manga_key = key === "WATCHING" ? "READING" : key;
			manga_key = key === "REWATCHING" ? "REREADING" : key;
			manga_key = key === "PLAN TO WATCH" ? "PLAN TO READ" : key;
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

	const handleSearchOnChange = (user_search) => {
		if (user_search !== "Search") {
		}
		setSearch(user_search.toLowerCase());
	};
	const handleStatusOnChange = (media_status) => {
		if (media_status !== "Status") {
			setStatus(media_status.toLowerCase().replaceAll(" ", "_"));
			setStatusSelectedOption(media_status);
		}
	};

	const handleFormatOnChange = (media_format) => {
		setFormat(media_format.toLowerCase().replaceAll(" ", "_"));
		setFormatSelectedOption(media_format);
	};
	const handleGenreOnChange = (media_genre) => {
		setGenre(media_genre.toLowerCase());
		setGenreSelectedOption(media_genre);
	};
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
