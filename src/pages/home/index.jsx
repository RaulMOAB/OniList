import React from "react";
import VerifyIfUserIsLogged from "@/components/Common/VerifyIfUserIsLogged";
import UserHomeLayout from "@/layouts/InfoPage/UserHomeLayout";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import FavoritesCards from "../../components/Card/FavoritesCards";

const getUserLibrary = async (id) => {
	const response = await fetch("http://127.0.0.1:8000/api/library/" + id, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export default function Home() {
	const { getToken, getUserID } = useContext(AuthContext); //TODO
	const [library, setLibrary] = useState({});

	useEffect(() => {
		if (getUserID()) {
			getUserLibrary(getUserID()).then((res) => {
				setLibrary(res);
				console.log(res);
			});
		}
	}, [getUserID]);
	const favoriteAnimes = [];
	library.forEach((media, index) => {
		favoriteAnimes.push(
			<FavoritesCards
				key={index}
				image={media.media.medium_cover_image}
				title={media.media.title}
			/>
		);
	});

	return (
		library && (
			<>
				<VerifyIfUserIsLogged redirect={"login"} />
				<UserHomeLayout>
					<div className='w-full grid grid-cols-2 p-6 text-accent'>
						<div>
							<p className='font-semibold'>Favorites Animes</p>
							<div className='bg-neutral p-5 grid grid-cols-5 gap-2'>
								{favoriteAnimes}
							</div>
						</div>
						<div></div>
					</div>
					<div className='min-h-screen'>
						<h1 className='text-center'>EXISTE</h1>
					</div>
				</UserHomeLayout>
			</>
		)
	);
}
