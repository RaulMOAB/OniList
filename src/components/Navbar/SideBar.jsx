import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SideBar({ links, category = "Category", type="normal"}) {
	const router = useRouter();
	const bar_links = [];
	let index = 0;
	for (const text_link in links) {
		let link = links[text_link];
		let actual_path = "";
		if(type !== "normal"){
			actual_path = router.pathname.replace(
			"[username]",
			router.query.username
		);

		}else{
			actual_path = router.pathname;
		}

		if (actual_path === link) {
			bar_links.push(
				<Link
					key={index}
					href={link}>
					<li
						key={index}
						className='p-2 rounded-md bg-base-300 transition-all duration-150'>
						{text_link}
					</li>
				</Link>
			);
		} else {
			bar_links.push(
				<Link
					key={index}
					href={link}>
					<li
						key={index}
						className='p-2 rounded-md hover:bg-base-300 transition-all duration-150'>
						{text_link}
					</li>
				</Link>
			);
		}
		index++;
	}
	return (
		<div className=' bg-neutral col-span-full lg:col-span-1 h-fit lg:sticky lg:top-5 rounded-md p-3'>
			<ul className='menu bg-neutral rounded-box'>
				<li className='menu-title'>
					<span>{category}</span>
				</li>
				{bar_links}
			</ul>
		</div>
	);
}
