import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

function VerifyIfUserIsLogged() {
  const { isUserAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
		isUserAuthenticated() ? null : router.push("/login");
	}, [isUserAuthenticated,router]);

  return <>{!isUserAuthenticated() ? <div className="min-h-screen"></div> : null}</>;
}

export default VerifyIfUserIsLogged;
