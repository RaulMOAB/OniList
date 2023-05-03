import React, { useEffect } from "react";
import { IoAt } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { format } from "path";
import { useState } from "react";

export default function FilterMedia({ type, medias, setFilteredMedia }) {
	//TODO FILTER

	const [format, setFormat] = useState("");
	const [status, setStatus] = useState("");
	const [genre, setGenre] = useState("");
	const [search, setSearch] = useState("");
	const [filteredMedia, setMedias] = useState(medias);
	const [query, setQuery] = useState({
		search: null,
		status: null,
		format: null,
		genre: null,
	});

	const status_array = [
		"Finished",
		"Releasing",
		"Not Yet Released",
		"Cancelled",
	];
	const status_options = [];
	status_array.forEach((item) => {
		status_options.push(<option>{item}</option>);
	});
	const formats = ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"];
	const formats_options = [];
	formats.forEach((format) => {
		formats_options.push(<option>{format}</option>);
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
	genres.forEach((genre) => {
		genres_options.push(<option>{genre}</option>);
	});

	useEffect(() => {
		setMedias(medias);
		// console.log(format);
		// console.log(status);
		// console.log(genre);
		// console.log(search)
		setQuery({
			search,
			status,
			format,
			genre,
		});
		console.log(filteredMedia);
	}, [format, status, genre, search, filteredMedia, medias]);

	const filter = () => {
		let aux_filtered_medias = filteredMedia.filter((media) => {
			let title = media.media.title;
			let media_title = title.toLowerCase();
			let media_format = media.media.format
			//let media_genres = JSON.parse(media.media.genres)

			let media_status = media.media.status
			console.log(search)
			return (media_title.includes(search)) ;
		});

		setMedias(aux_filtered_medias);
		setFilteredMedia(aux_filtered_medias);
	};

	const handleSearchOnChange = (user_search) => {
		setSearch(user_search.toLowerCase());
		filter()
	};
	const handleStatusOnChange = (media_status) => {
		setStatus(media_status);
		filter()
	};

	const handleFormatOnChange = (media_format) => {
		setFormat(media_format);
		filter()
	};
	const handleGenreOnChange = (media_genre) => {
		setGenre(media_genre);
		filter()
	};

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
						className={
							"w-full h-12 focus:outline-none bg-base-300  text-accent font-semibold p-3"
						}
					/>
				</label>
			</div>

			<div className='mb-3 overflow-auto'>
				<small className='text-accent'>Filters</small>
				<select
					className='select w-full max-w-xs mb-1 bg-base-300'
					value={format}
					onChange={(event) => {
						handleFormatOnChange(event.target.value);
					}}>
					<option
						disabled
						selected>
						Format
					</option>
					{formats_options}
				</select>
				<select
					className='select w-full max-w-xs mb-1 bg-base-300'
					onChange={(event) => {
						handleStatusOnChange(event.target.value);
					}}>
					<option
						disabled
						selected>
						Status
					</option>
					{status_options}
				</select>
				<select
					className='select w-full max-w-xs mb-1 bg-base-300 overflow-auto'
					onChange={(event) => {
						handleGenreOnChange(event.target.value);
					}}>
					<option
						disabled
						selected>
						Genres
					</option>
					{genres_options}
				</select>
			</div>
		</div>
	);
}
