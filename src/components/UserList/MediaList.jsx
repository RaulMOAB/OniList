import React from "react";
import ListCards from "./ListCard";

export default function MediaList({ list, medias, setStatus, setSelectedMedia }) {
	if (medias.length !== 0) {
		let listCards = [];
		medias.forEach((media, index) => {
			listCards.push(
				<div>
					<ListCards
						media={media}
						setStatus={setStatus}
						setSelectedMedia={setSelectedMedia}
						key={index}
					/>
				</div>
			);
		});
		return (
			<>
			<p className="text-accent mb-1 text-lg ">{list}</p>
				<div className='grid grid-cols-3 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 gap-10 mb-3 w-full'>
					{listCards}
				</div>
			</>
		);
	} else {
		return null;
	}
}
