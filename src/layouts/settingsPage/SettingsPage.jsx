import React from "react";
import SideBar from "@/components/Navbar/SideBar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Container from "@/components/Common/PageContainer/Container";

export default function SettingsPage({ children }) {
	const { user } = useContext(AuthContext);
	const links = {
		Profile: `/settings`,
		Account: `/settings/account`,
	};
	return (
		<Container>
			<div className='grid lg:grid-cols-6 gap-4 py-6 lg:px-40'>
				<div className=' bg-neutral w-full col-span-6 lg:col-span-1 h-fit lg:sticky lg:top-5 rounded-md'>
					<SideBar
						links={links}
						category='Settings'
					/>
				</div>
				<div className='w-full h-fit col-span-6 lg:col-span-5 gap-2 bg-neutral p-10 rounded-md'>
					{children}
				</div>
			</div>
		</Container>
	);
}
