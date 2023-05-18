import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

function VerifyIfUserIsLogged() {
	const { user } = useContext(AuthContext);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

	useEffect(() => {
    if (Object.keys(user).length !== 0) {
			setIsUserAuthenticated(true);
		} else {
			setIsUserAuthenticated(false);
			router.push("/login");
		}
  
  }, [router, user]);

  return <>{!isUserAuthenticated ? <div className="min-h-screen"></div> : null}</>;
}

export default VerifyIfUserIsLogged;
