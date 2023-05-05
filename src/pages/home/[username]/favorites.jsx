import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from "@/contexts/AuthContext";

export default function Favorites() {
  const {user, fetchData} = useContext(AuthContext)
  const [favoritesMedias, setFavoritesMedias] = useState([]);

  	useEffect(() => {
			if (user.username) {
				let endpoint = `library/${user.username}/favorites`;
				let method = "GET";
				fetchData(endpoint, method).then((res_favorites) => {
					setFavoritesMedias(res_favorites);
				});
			}
		}, [user, fetchData,]);

    console.log(favoritesMedias)
  return (
    <div>favorites</div>
  )
}
