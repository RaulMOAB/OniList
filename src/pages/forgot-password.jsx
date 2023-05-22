import React from "react";
import Head from "next/head";
import ForgotForm from "../components/Forms/ForgotForm";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
export default function ForgotPage() {
	  const { user } = useContext(AuthContext);
		const router = useRouter();
		useEffect(() => {
			if (!(Object.keys(user).length === 0)) {
				router.replace("/home/" + user.username);
			}
		}, [user, router]);
	return (
		<>
			<Head>
				<title>Forgot password · OniList</title>
			</Head>
			<div><ForgotForm/></div>
		</>
	);
}
