import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "react-indiana-drag-scroll/dist/style.css";
const inter = Inter({
  subsets: ["latin"],
});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Head>
          <title>Neomovie</title>
          <meta
            name="description"
            content="Movie library using TheMovieDB API"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
