import React from "react";
import VerifyIfUserIsLogged from "../components/Common/VerifyIfUserIsLogged";
import Container from "../components/Common/PageContainer/Container";
import UserHomeLayout from "../layouts/InfoPage/UserHomeLayout";
import ListPreview from "../components/Card/ListPreview";
export default function Home() {
  return (
    <>
      <VerifyIfUserIsLogged redirect={"login"} />
      <UserHomeLayout>
        <div className="min-h-screen">
          <ListPreview title="Popular Animes" />
        </div>
      </UserHomeLayout>
    </>
  );
}
