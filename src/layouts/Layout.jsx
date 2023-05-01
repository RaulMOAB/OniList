import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import UserHomeLayout from "@/layouts/InfoPage/UserHomeLayout";
import VerifyIfUserIsLogged from "@/components/Common/VerifyIfUserIsLogged";


export default function Layout({ children }) {
	const { theme } = useContext(ThemeContext);
	const router = useRouter();
	const isHomePage = router.pathname.startsWith("/home");
	return (
		<>
			<div
				data-theme={theme}
				className={
					theme === "oni-ligth" ? "body-ligth" : "body-dark" + "  font-sans"
				}>
				<Navbar />
				{isHomePage ? (
					<>
						<VerifyIfUserIsLogged />
						<UserHomeLayout>
							<main>{children}</main>
						</UserHomeLayout>
					</>
				) : (
					<>
						<main>{children}</main>
					</>
				)}
				<Footer />
			</div>
		</>
	);
}
