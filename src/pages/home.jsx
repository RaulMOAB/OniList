import React from 'react'
import VerifyIfUserIsLogged from '../components/Common/VerifyIfUserIsLogged'

export default function Home() {

  return (
		<>
			<VerifyIfUserIsLogged redirect={'login'}/>
			<div className='min-h-screen'>
				<h1 className='text-center'>HOME</h1>
			</div>
		</>
	);
}