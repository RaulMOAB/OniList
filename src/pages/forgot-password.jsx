import React from "react";
import Head from "next/head";
import ForgotForm from "../components/Forms/ForgotForm";
export default function forgotPage() {
	return (
		<>
			<Head>
				<title>Forgot password · OniList</title>
			</Head>
			<div><ForgotForm/></div>
		</>
	);
}
