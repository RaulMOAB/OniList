import Head from "next/head";
import Image from "next/image";
import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";

export default function Home() {
  let data = useContext(MediaContext);
  // let result;

  // getMedia_promise.then((promise_result) => {
  //   result = promise_result;
  // });

  console.log(data[0].id);
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
      </Head>
      <main>
        <h1>Context</h1>
        <p>{data[0].id}</p>
      </main>
    </>
  );
}
