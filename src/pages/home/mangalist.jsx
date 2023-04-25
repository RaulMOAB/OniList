import React from "react";
import VerifyIfUserIsLogged from "../../components/Common/VerifyIfUserIsLogged";
import UserHomeLayout from "@/layouts/InfoPage/UserHomeLayout";
export default function MangaList() {
	return (
		<>
			<VerifyIfUserIsLogged redirect={"login"} />
			<UserHomeLayout>
				<div className='min-h-screen'>
					<h1>MANGA LIST</h1>
				</div>
			</UserHomeLayout>
		</>
	);
}
