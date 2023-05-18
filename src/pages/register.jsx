import React from 'react'
import RegisterForm from '../components/Forms/RegisterForm'
import Head from 'next/head'
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
export default function Register() {
    const { user } = useContext(AuthContext);
		const router = useRouter();
		useEffect(() => {
			if (!(Object.keys(user).length === 0)) {
				router.push("/home/" + user.username);
			}
		}, [user, router]);
  return (
    <>
    	<Head>
				<title>Register · OniList</title>
			</Head>
    <div>
      <RegisterForm/>
    </div>
    </>
  )
}