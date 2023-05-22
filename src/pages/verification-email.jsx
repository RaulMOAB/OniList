import React from 'react'
import VerificationCode from '../components/Modals/VerificationCode'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
export default function VerifyCode() {
	  const { user } = useContext(AuthContext);
    const router = useRouter();
		useEffect(() => {
			if (!(Object.keys(user).length === 0)) {
				router.replace("/home/" + user.username);
			}
		}, [user,router]);
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