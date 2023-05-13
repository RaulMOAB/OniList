import AnimePage from "./../../../components/AnimePage/AnimePage";


export default function TrendingAnime() {

  let url   = "anime/trending"
  let title = "Trending Anime"


  return (
    <>
      <AnimePage url={url} title={title} />
    </>
  );
}
