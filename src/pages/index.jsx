import Hero from "./../components/Hero/Hero";
import IndexAnimePage from "./../components/AnimePage/IndexAnimePage";
import Head from "next/head";

export default function Home() {


  return (
		<>
			<Head>
				<title>Home · OniList</title>
			</Head>
			<IndexAnimePage />
		</>
	);
}
