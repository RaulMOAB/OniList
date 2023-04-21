import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

function Footer() {
  return (
		<>
			<footer className='footer p-10 bg-base-content text-neutral-content place-content-center '>
				<div className='mx-16'>
					<Image
						alt='japann cloud'
						src={"/assets/cloud/japan_cloud.png"}
						width={80}
						height={80}
					/>
					<p className=''>
						<span className='font-semibold'>ONILIST</span>
						<br />
						Copyright © 2023 - All right reserved
					</p>
				</div>
				<div className='mx-16'>
					<span className='footer-title'>Social</span>
					<div className='grid grid-flow-col gap-4'>
						<a>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								className='fill-current  hover:text-blue-500 transition duration-200'>
								<path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
							</svg>
						</a>
						<a>
							<svg
								className='fill-current text-white hover:text-blue-500 transition duration-200'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 448 512'
								width='25'
								height='25'>
								<path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
							</svg>
						</a>
						<a>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								className='fill-current hover:text-blue-500 transition duration-200'>
								<path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
							</svg>
						</a>
					</div>
				</div>
				<div className='mx-16'>
					<span className='footer-title'>Developers</span>
					<a
						href='https://github.com/RaulMOAB'
						target='_blank'
						className='link link-hover'>
						Raul Montoro
					</a>
					<a
						href='https://github.com/AMGG13'
						target='_blank'
						className='link link-hover'>
						Alvin Miller
					</a>
					<a
						href=''
						target='_blank'
						className='link link-hover'>
						Jonatan Feliz
					</a>
				</div>
			</footer>
		</>
	);
}

export default Footer