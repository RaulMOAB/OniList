import React from "react";
import CarrouselCard from "../Card/CarrouselCard";
import Carousel from "../Carousel/Carousel";

function Hero({ media }) {
  console.log(media);

  let cards = [
    {
      key: media[0].id,
      content: (
        <CarrouselCard
          img={media[0].large_banner_image}
          title={media[0].title}
          genres={media[0].genres}
        />
      ),
    },
    {
      key: media[1].id,
      content: (
        <CarrouselCard
          img={media[1].large_banner_image}
          title={media[1].title}
          genres={media[1].genres}
        />
      ),
    },
    {
      key: media[2].id,
      content: (
        <CarrouselCard
          img={media[2].large_banner_image}
          title={media[2].title}
          genres={media[2].genres}
        />
      ),
    },
    {
      key: media[3].id,
      content: (
        <CarrouselCard
          img={media[3].large_banner_image}
          title={media[3].title}
          genres={media[3].genres}
        />
      ),
    },
    {
      key: media[4].id,
      content: (
        <CarrouselCard
          img={media[4].large_banner_image}
          title={media[4].title}
          genres={media[4].genres}
        />
      ),
    },
  ];
  return (
    <>
      <div className="hero min-h-fit bg-base-content text-slate-200">
        <div className="my-10 hero-content h-96 bg-base-content rounded-lg flex-col lg:flex-row-reverse">
          {
            /* <CarrouselCard media={media} /> */
            <Carousel
              cards={cards}
              height="500px"
              width="30%"
              margin="0 auto"
              offset={2}
              showArrows={false}
            />
          }
          <div className="w-4/6">
            <h1 className="text-7xl font-bold">Welcome to OniList!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-error">Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
