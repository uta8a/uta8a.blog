// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);
  return (
    <>
      <Head>
        <link rel="icon shortcut" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: initTwitterScriptInner,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
