import React from 'react'
import LoginForm from '../components/Forms/LoginForm'
import { useRouter } from 'next/router'
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

function Login() {
  const { user } = useContext(AuthContext);
    const router = useRouter();

		useEffect(() => {
			if (user) {
				router.push("/home");
			}
		}, [user,router]);

  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default Login;