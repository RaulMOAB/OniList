import React from "react";
import ListCards from "./ListCard";

export default function MediaList({ list, medias, setStatus, setSelectedMedia }) {
	if (medias.length !== 0) {
		let listCards = [];
		medias.forEach((media, index) => {
			listCards.push(
				<div key={index}>
					<ListCards
						media={media}
						setStatus={setStatus}
						setSelectedMedia={setSelectedMedia}
					/>
				</div>
			);
		});
		return (
			<div className=''>
				<p className='text-accent mb-1 text-lg'>{list}</p>
				<div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-6 mb-5'>
					{listCards}
				</div>
			</div>
		);
	} else {
		return null;
	}
}
