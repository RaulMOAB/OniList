import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect , useState} from "react";

function VerifyIfUserIsLogged({redirect}) {
  const { user } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace(redirect);
		}
	}, [user, router,redirect]);

	return (
    <>
      {!user ? (<div className="min-h-screen"></div>) : (<div></div>)}
    </>
    
  );
}

export default VerifyIfUserIsLogged;
