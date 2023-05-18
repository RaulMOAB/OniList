import "../styles/globals.css";
import Layout from "../layouts/Layout";
import { MediaContextProvider } from "../contexts/MediaContext";
import {AuthContextProvider} from '@/contexts/AuthContext'
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
		<>
		<ThemeContextProvider>
			<AuthContextProvider>
				<MediaContextProvider>
					<Layout >
						<Head>
							<meta
								name='description'
								content='Build your own anime and manga library'
							/>
							<meta
								name='viewport'
								content='width=device-width, initial-scale=1'
							/>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</MediaContextProvider>
			</AuthContextProvider>
		</ThemeContextProvider>
		</>
	);
}
