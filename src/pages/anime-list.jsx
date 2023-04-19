import React from 'react'
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";

export default function AnimeList() {
  return (
		<>
			<VerifyIfUserIsLogged redirect={"login"} />
			<div className='min-h-screen'>
				<h1>ANIME LIST</h1>
			</div>
		</>
	);
}
