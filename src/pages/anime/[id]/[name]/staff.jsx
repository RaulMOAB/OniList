import React from "react";
import MediaHeader from "../../../../components/MediaPage/MediaHeader";
import MediaBodyStaff from "../../../../components/MediaPage/MediaBodyStaff";
import Head from "next/head";

function StaffPage() {
  return (
    <>
    <Head><title>Staff · OniList</title></Head>
      <MediaHeader />
      <MediaBodyStaff />
    </>
  );
}

export default StaffPage;
