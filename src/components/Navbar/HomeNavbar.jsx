import React from 'react'
import Link from 'next/link'

function HomeNavbar() {
  return (
		<div className='navbar bg-base-100 text-accent text-sm'>
			<div className='navbar-start'></div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					<li className='ml-10'>
						<Link href={'/home'}>Home</Link>
					</li>
					<li className='ml-10'>
						<Link href={'/home/animelist'}>Anime List</Link>
					</li>
					<li className='ml-10'>
						<Link href={'/home/mangalist'}>Manga List</Link>
					</li>
					<li className='ml-10'>
						<Link href={'/home/favorites'}>Favorites</Link>
					</li>
					<li className='ml-10'>
						<Link href={'/home/stats'}>Stats</Link>
					</li>
					<li className='ml-10'>
						<Link href={'/home/social'}>Social</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-end'></div>
		</div>
	);
}

export default HomeNavbar