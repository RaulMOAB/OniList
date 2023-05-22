import React from "react";
import CarrouselCard from "../Card/CarrouselCard";
import Carousel from "../Carousel/Carousel";
import Typewriter from 'typewriter-effect';

function Hero({ media }) {
  //carousel cards
  let cards = [
    {
      key: media[0].id,
      content: (
        <CarrouselCard
          img={
            media[0].extra_large_cover_image ||
            media[0].large_cover_image ||
            media[0].medium_cover_image
          }
          title={media[0].title}
          genres={JSON.parse(media[0].genres).splice(0, 3).join(" ")}
        />
      ),
    },
    {
      key: media[1].id,
      content: (
        <CarrouselCard
          img={
            media[1].extra_large_cover_image ||
            media[1].large_cover_image ||
            media[1].medium_cover_image
          }
          title={media[1].title}
          genres={JSON.parse(media[1].genres).splice(0, 3).join(" ")}
        />
      ),
    },
    {
      key: media[2].id,
      content: (
        <CarrouselCard
          img={
            media[2].extra_large_cover_image ||
            media[2].large_cover_image ||
            media[2].medium_cover_image
          }
          title={media[2].title}
          genres={JSON.parse(media[2].genres).splice(0, 3).join(" ")}
        />
      ),
    },
    {
      key: media[3].id,
      content: (
        <CarrouselCard
          img={
            media[3].extra_large_cover_image ||
            media[3].large_cover_image ||
            media[3].medium_cover_image
          }
          title={media[3].title}
          genres={JSON.parse(media[3].genres).splice(0, 3).join(" ")}
        />
      ),
    },
    {
      key: media[4].id,
      content: (
        <CarrouselCard
          img={
            media[4].extra_large_cover_image ||
            media[4].large_cover_image ||
            media[4].medium_cover_image
          }
          title={media[4].title}
          genres={JSON.parse(media[4].genres).splice(0, 3).join(" ")}
        />
      ),
    },
  ];
  return (
    <>
      <div data-theme="oni-dark" className="bg-base-content">
        <div className="hero-content mx-auto  bg-base-content  text-slate-200">
          <div className="hero-content  xl:h-96 bg-base-content  rounded-lg flex-col-reverse lg:flex-row-reverse">
            {
              <Carousel
                cards={cards}
                height="500px"
                width="30%"
                margin="0 auto"
                offset={2}
                showArrows={false}
              />
            }
            <div className="relative md:w-5/6 xl:text-left md:text-center lg:w-2/4 lg:mx-auto">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold">Welcome to OniList Club!</h1>
              </div>
              <p className="py-6">
                Add what you like, track your animes and manga, build your own
                library and discover new medias to enjoy! 
                <br />
              </p>
              <div className="text-2xl">
              <Typewriter
              options={{
                strings: [" Welcome to the club,Yōkai ", "クラブへようこそ、妖怪さん"],
                autoStart: true,
                loop: true,
              }}
            />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
