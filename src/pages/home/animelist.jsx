import React from 'react'
import VerifyIfUserIsLogged from "@/components/Common/VerifyIfUserIsLogged";
import UserHomeLayout from "@/layouts/InfoPage/UserHomeLayout";


export default function AnimeList() {
	
  return (
		<>
			<VerifyIfUserIsLogged redirect={"login"} />
			<UserHomeLayout>
			<div className='min-h-screen'>
				<h1>ANIME LIST</h1>
			</div>
			</UserHomeLayout>
		</>
	);
}
