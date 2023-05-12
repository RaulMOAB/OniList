import AnimePage from "./../../../components/AnimePage/AnimePage";


export default function ThisSeason() {

    const date = new Date();
    const month = date.getMonth() + 1;
    let season = '';

    if (month >= 3 && month <= 5) {
        season = 'Spring';
    } else if (month >= 6 && month <= 8) {
        season = 'Summer';
    } else if (month >= 9 && month <= 11) {
        season = 'Autumn';
    } else {
        season = 'Winter';
    }
    const year = date.getFullYear();


    let url   = "anime/this-season"
    let title = `${season} ${year} Anime`


    return (
        <>
            <AnimePage url={url} title={title} />
        </>
    );
}
