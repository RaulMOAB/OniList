/* eslint-disable @next/next/no-img-element */
import Media_Tooltip from "./Media_Tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MediaCard({ media, index }) {
  const route = useRouter();
  //get parameters
  let genres = JSON.parse(media.genres).splice(0, 3).join(" ");
  let type;
  media.type == 'ANIME' ? type = 'anime' : type = 'manga';


  const mediaPage = () => {
    route.push(`/${type}/${media.id}`);//TODO add media type 
  };

  return (
		<>
			<div
				className={
					index <= 3
						? "relative rounded-md bg-cover w-fit"
						: index != 5
						? "relative rounded-md bg-cover w-fit md:hidden lg:block"
						: "relative rounded-md bg-cover w-fit xl:block lg:hidden md:hidden"
				}
				key={media.id}
				onClick={mediaPage}>
				<div className='cursor-pointer aspect-2/3 '>
					<img
						src={
							media.large_banner_image ||
							media.extra_large_cover_image ||
							media.large_cover_image
						}
						className='rounded-md object-cover w-full h-full' 
						alt='media image'
					/>
					<div className='absolute inset-x-0 bottom-0 h-16 rounded-b-md text-accent opacity-80  bg-neutral'></div>
					<div className='absolute inset-x-0 bottom-0 h-16 rounded-b-md text-accent'>
						<div className='px-2'>
							<div className='flex '>
								<p

									className='text-xl-base mt-2 sm-2 w-5/6 truncate font-semibold'>
									{media.title}
								</p>
							</div>
							<p

								className='text-xs mt-1 ms-2 truncate'>
								{genres}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
