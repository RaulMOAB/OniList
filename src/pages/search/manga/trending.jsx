import MangaPage from "./../../../components/MangaPage/MangaPage";


export default function TopManhwa() {

  let url   = "manga/trending"
  let title = "Trending Manga"

  return (
    <>
      <MangaPage url={url} title={title}/>
    </>
  );
}
