import AnimePage from "./../../../components/AnimePage/AnimePage";


export default function TopAnime() {

  let url   = "anime/top"
  let title = "Top 100 Anime"
  
  return (
    <>
      <AnimePage url={url} title={title} />
    </>
  );
}
