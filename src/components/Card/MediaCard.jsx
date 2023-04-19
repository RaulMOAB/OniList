export default function MediaCard({ media }) {
  //get parameters
  let genres = JSON.parse(media.genres).splice(0, 3).join(" ");

  let score = 7.9;

  return (
    <>
      <div
        className="mx-auto relative rounded-md grid grid-cols-5"
        style={{
          backgroundImage: `url('${media.large_banner_image}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "185px",
          height: "265px",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg text-white backdrop-blur-md">
          <div className="px-2">
            <div className="flex ">
              <p className="text-xl-base mt-2 sm-2 w-4/6 truncate font-semibold">
                {media.title}
              </p>
              <div className="w-2/6 mt-2 text-right">
                <i
                  className=" fa-solid fa-star"
                  style={{ color: "#f5c211" }}
                ></i>
                <p className="inline-block">{score}</p>
              </div>
            </div>
            <p className="text-xs mt-1 ms-2 truncate">{genres}</p>
          </div>
        </div>
      </div>
    </>
  );
}
