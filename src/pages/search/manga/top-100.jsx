import MangaPage from "./../../../components/MangaPage/MangaPage";


export default function TopManga() {

  let url   = "manga/top"
  let title = "Top 100 Manga"

  return (
    <>
      <MangaPage url={url} title={title}/>
    </>
  );
}
