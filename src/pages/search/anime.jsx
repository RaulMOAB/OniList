import React from "react";
import Container from "@/components/Common/PageContainer/Container";
import ListPreview from "../../components/Card/ListPreview";

function anime() {
  return (
    <>
      <Container>
        <h1>Browse Anime</h1>
        <div className="p-3  my-5">
          <p className="text-center text-accent">Filters</p>
          <ListPreview title="Popular Animes" />
        </div>
      </Container>
    </>
  );
}

export default anime;
