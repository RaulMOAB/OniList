import AnimePage from "./../../../components/AnimePage/AnimePage";


export default function TrendingAnime() {

  let url   = "anime/popular"
  let title = "All-Time Popular anime"


  return (
    <>
      <AnimePage url={url} title={title} />
    </>
  );
}
