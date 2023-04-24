import React from "react";
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";
import Container from "../components/Common/PageContainer/Container";

export default function Home() {
  return (
    <>
      <VerifyIfUserIsLogged redirect={"login"} />
      <Container>
        <div className="min-h-screen">
          <h1 className="text-center">HOME</h1>
        </div>
      </Container>
    </>
  );
}
