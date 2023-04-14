import "@/styles/globals.css";
import Layout from "../layouts/Layout";
import { MediaContextProvider } from "../contexts/MediaContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MediaContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MediaContextProvider>
    </>
  );
}
