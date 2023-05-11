import MangaPage from "./../../../components/MangaPage/MangaPage";


export default function TopManhwa() {

  let url   = "manga/manhwa"
  let title = "Top Manhwa"

  return (
    <>
      <MangaPage url={url} title={title}/>
    </>
  );
}
