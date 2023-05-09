import React from 'react'
import Link from 'next/link';
export default function SideBar({links}) {
  const bar_links = []
	let index = 0;
  for(const text_link in links){
    let link = links[text_link];

    bar_links.push(
			<Link key={index} href={link}>
				<li key={index} className='p-2 rounded-md hover:bg-base-300'>{text_link}</li>
			</Link>
		);
		index++;
  }
  return (
		<div className=' bg-neutral col-span-5 lg:col-span-1 h-fit lg:sticky lg:top-5 rounded-md p-3'>
			<ul>
				{bar_links}
			</ul>
		</div>
	);
}
