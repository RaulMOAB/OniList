import React from 'react'
import LoginForm from '../components/Forms/LoginForm'
import { useRouter } from 'next/router'
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import Head from 'next/head';

function Login() {
  const { user } = useContext(AuthContext);
    const router = useRouter();
		useEffect(() => {
			if (!(Object.keys(user).length === 0)) {
				router.replace("/home/"+user.username);
			}
		}, [user,router]);

  return (
    <>
    <Head>
				<title>Login · OniList</title>
		</Head>
    <div>
      <LoginForm/>
    </div>
    </>
  )
}

export default Login;