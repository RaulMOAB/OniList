import React from 'react'
import VerificationCode from '../components/Modals/VerificationCode'
import Head from 'next/head'
//TODO CONTROLAR SI ENTRAN AQUI
export default function register() {
    return (
			<>
				<Head>
					<title>Verify code · OniList</title>
				</Head>
				<div>
					<VerificationCode />
				</div>
                
			</>
		);
}