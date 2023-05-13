import AnimePage from "./../../../components/AnimePage/AnimePage";


export default function TopMovies() {

  let url   = "anime/movie"
  let title = "Top Anime Movies"


  return (
    <>
      <AnimePage url={url} title={title} />
    </>
  );
}
