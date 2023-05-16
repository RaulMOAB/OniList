/* eslint-disable @next/next/no-img-element */
import Media_Tooltip from "./Media_Tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DubberedCard({ character, index }) {
  const route = useRouter();
  
    //console.log(character)

  //   console.log(media.id);
  const CharacterPage = () => {
    route.push(`/character/${character.id}/${character.romaji}`);//TODO add media type 
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
				key={character.id}
				onClick={CharacterPage}>
				<div className='cursor-pointer aspect-2/3 '>
					<img
						src={character.image_large}
						className='rounded-md object-cover w-full h-full  ' //aspect-2/3
						alt='Character image'
					/>
					<div className="pt-2 text-accent font-semibold">
						{character.romaji ?? character.name}
					</div>
				</div>
			</div>
		</>
	);
}
