import React from "react";
import Link from "next/link";
import VerifyIfUserIsLogged from "../../components/Common/VerifyIfUserIsLogged";

function index() {
  return (
  //TODO verifyLogin
      <div>
        <h1>SETTINGS PAGE</h1>
        <Link href={"settings/account"}>Account</Link>
      </div>
   
  );
}

export default index;
