import Head from "next/head";
import Image from "next/image";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";
import MediaCard from './mediaCard';

export default function Home() {
  //let data = useContext(MediaContext);
  // let result;

  // getMedia_promise.then((promise_result) => {
  //   result = promise_result;
  // });

  // console.log(data[0].id);
  // let media1 = data[0];
  
  return (
    <>
      <Head>
        <title>OniList</title>
        <meta
          name="description"
          content="Build your own anime and manga library"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <main>
        <h1>Context</h1>
        {/* <p>{data[0].id}</p> */}
        <MediaCard/>
      </main>
    </>
  );
}
