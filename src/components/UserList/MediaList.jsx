import React from "react";
import ListCards from "./ListCard";

/**
 * listType: type of list for example; WATCHING ,READING,COMPLETED etc.
 * medias: all media in which its status is equal to the listType.
 * setStatus: to pass it to the next component which is ListCard.
 * setSelectedMedia: to pass it to the next component which is ListCard.
 * 
 * @param {object} list 
 * @param {object[]} medias 
 * @param {function} 	setStatus 
 * @param {function} setSelectedMedia 
 * @returns 
 */
export default function MediaList({ listType, medias, setStatus, setSelectedMedia }) {
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
				<p className='text-accent mb-1 text-lg'>{listType}</p>
				<div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-6 mb-5'>
					{listCards}
				</div>
			</div>
		);
	} else {
		return null;
	}
}
