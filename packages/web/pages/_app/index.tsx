import Head from 'next/head';
import { AppContext, AppProps, AppInitialProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../../components/Theme';

import Layout from '../../components/Layout';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Beatelligence</title>
      </Head>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

CustomApp.getInitialProps = async ({
  Component,
  ctx
}: AppContext): Promise<AppInitialProps> => {
  //
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : { pageProps: null };

  return { pageProps };
};

export default CustomApp;
