import "@/styles/globals.css";
import Layout from "../layouts/Layout";
import {ContextProvider} from "../contexts/MediaContext";

export default function App({ Component, pageProps }) {
  return (
    <>
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
    </>
  );
}
