/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

export default function LoadingCloud({show}) {
  return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen h-[calc(100% - 66.5px)]'>
				<img
					className='animate-bounce animate-infinite animate-duration-1000 animate-ease-out'
					src={"/assets/cloud/loading-cloud.png"}
					height={50}
					width={80}
					alt='loading-cloud'></img>
				<div className='text-accent'>
					ᕙ(⇀‸↼‶)ᕗ
				</div>
			</div>
		</>
	);
}
