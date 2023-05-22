import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import style from "../../styles/Hero_Card.module.css";


function CarrouselCard({ img, title, genres }) {
  const [show, setShown] = useState(false);
  const props = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
  });

  return (
		<animated.div
			className={style.card}
			style={props}
			onMouseEnter={() => setShown(true)}
			onMouseLeave={() => setShown(false)}>
			<div
				className='mx-auto relative rounded-lg '
				style={{
					backgroundImage: `url('${img}')`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					width: "230px",
					height: "345px",
				}}>
				<div className='absolute inset-x-0 bottom-0 h-16 rounded-b-md text-accent opacity-80  bg-neutral'></div>
				<div className='absolute inset-x-0 bottom-0 h-16 rounded-b-md text-accent'>
					<div className='px-2'>
						<div className='flex '>
							<p className='text-xl-base mt-2 sm-2 w-5/6 truncate font-semibold'>
								{title}
							</p>
						</div>
						<p className='text-xs mt-1 ms-2 truncate'>{genres}</p>
					</div>
				</div>
			</div>
		</animated.div>
	);
}

export default CarrouselCard;
