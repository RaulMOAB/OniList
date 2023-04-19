import React from 'react'
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";

export default function Profile() {

  return (
		<>
			<VerifyIfUserIsLogged redirect={"login"} />
			<div className='min-h-screen'>
				<h1>PROFILE</h1>
			</div>
		</>
	);
}
