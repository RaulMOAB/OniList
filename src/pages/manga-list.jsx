import React from 'react'
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";

export default function MangaList() {

  return (
		<>
			<VerifyIfUserIsLogged redirect={"login"} />
			<div className='min-h-screen'>
				<h1>MANGA LIST</h1>
			</div>
		</>
	);
}
