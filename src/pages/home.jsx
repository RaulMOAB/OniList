import React from "react";
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";
import Container from "../components/Common/PageContainer/Container";
import UserHomeLayout from "../layouts/InfoPage/UserHomeLayout";
export default function Home() {
  return (
    <>
      <VerifyIfUserIsLogged redirect={"login"} />
        <UserHomeLayout>
        <div className="min-h-screen">
          <h1 className="text-center">HOME</h1>
        </div>
        </UserHomeLayout>
    </>
  );
}
