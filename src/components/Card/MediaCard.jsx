/* eslint-disable @next/next/no-img-element */
export default function MediaCard({ media ,index}) {
  //get parameters
  let genres = JSON.parse(media.genres).splice(0, 3).join(" ");

  let score = 7.9;

  console.log(index)

  return (
		<>
			<div
				className={
					index < 4
						? "relative rounded-xl bg-cover w-fit"
						: "relative rounded-xl bg-cover w-fit md:hidden lg:block"
				}>
				<img
					src={media.large_banner_image}
					className='rounded-xl'
					alt='media image'
				/>
				<div className='absolute inset-x-0 bottom-0 h-16 rounded-b-lg text-white backdrop-blur-md'>
					<div className='px-2'>
						<div className='flex '>
							<p className='text-xl-base mt-2 sm-2 w-4/6 truncate font-semibold'>
								{media.title}
							</p>
							<div className='w-2/6 mt-2 text-right'>
								<i
									className=' fa-solid fa-star'
									style={{ color: "#f5c211" }}></i>
								<p className='inline-block'>{score}</p>
							</div>
						</div>
						<p className='text-xs mt-1 ms-2 truncate'>{genres}</p>
					</div>
				</div>
			</div>
		</>
	);
}
