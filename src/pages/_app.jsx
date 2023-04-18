import "@/styles/globals.css";
import Layout from "../layouts/Layout";
import { MediaContextProvider } from "../contexts/MediaContext";
import {AuthContextProvider} from '@/contexts/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <>
    <AuthContextProvider>
        <MediaContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MediaContextProvider>
    </AuthContextProvider>
    </>
  );
}
