import React from 'react'
import {IoAt} from 'react-icons/io5'
import {AiOutlineSearch} from 'react-icons/ai'
import { format } from 'path';
import { useState } from 'react';

export default function FilterMedia({type, media, setFilteredMedia }) {
	//TODO FILTER
	const status = ["Finished", "Releasing", "Not Yet Released", "Cancelled"];
	const status_options = [];
	status.forEach(item => {
		status_options.push(<option>{item}</option>)
	});
	const formats = ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"];
	const formats_options = []
	formats.forEach(format=>{
		formats_options.push(<option>{format}</option>)
	})
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
	genres.forEach(genre=>{
		genres_options.push(<option>{genre}</option>);
	})

	const handleFormat = (e)=>{
		console.log(e.target.value)
	}


	return (
		<div className='p-3'>
			<div className='mb-3'>
				<label className='flex justify-center rounded-md input-group input-group-md text-md'>
					<span className='bg-base-300 '>
						<AiOutlineSearch className='text-lg text-accent' />
					</span>
					<input
						type='email'
						onChange={(event) => handleEmailChange(event.target.value)}
						placeholder='Search'
						className={
							"w-full h-12 focus:outline-none bg-base-300  text-accent font-semibold p-3"
						}
					/>
				</label>
			</div>
			<div className='mb-3'>
				<small className='text-accent'>Filters</small>
				<select className='select w-full max-w-xs mb-1 bg-base-300' onSelect={handleFormat}>
					<option
						disabled
						selected>
						Format
					</option>
					{formats_options}
				</select>
				<select className='select w-full max-w-xs mb-1 bg-base-300'>
					<option
						disabled
						selected>
						Status
					</option>
					{status_options}
				</select>
				<select className='select w-full max-w-xs mb-1 bg-base-300'>
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
