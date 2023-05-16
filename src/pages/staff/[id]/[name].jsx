import React from "react";
import StaffHeader from "./../../../components/StaffPage/StaffHeader";
import StaffBody from "./../../../components/StaffPage/StaffBody";
import ScrollButton from "./../../../components/Buttons/ScrollButton";
import Head from "next/head";
function StaffPage() {
  return (
		<>
			<Head>
				<title>Staff · OniList</title>
			</Head>
			<StaffHeader />
			<StaffBody />
			<ScrollButton />
		</>
	);
}
export default StaffPage;
