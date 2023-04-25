import React from "react";
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";
import Container from "../components/Common/PageContainer/Container";
import ListPreview from "../components/Card/ListPreview";

export default function Home() {
  return (
    <>
      <VerifyIfUserIsLogged redirect={"login"} />
      <Container>
        <div className="min-h-screen">
          <ListPreview title="Popular Animes" />
        </div>
      </Container>
    </>
  );
}
