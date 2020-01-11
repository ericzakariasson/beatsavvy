import { AppContext, AppProps, AppInitialProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../../views/components/Theme';
import { withApollo } from '../../graphql/withApollo';

import Layout from '../../views/components/Layout';

interface IAppInitialProps extends AppInitialProps {
  auth?: boolean;
}

function CustomApp({ Component, pageProps }: any) {
  console.log(pageProps);
  return (
    <ThemeProvider theme={{ theme }}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

CustomApp.getInitialProps = async ({
  Component,
  ctx
}: AppContext): Promise<IAppInitialProps> => {
  //
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  console.log(ctx);
  return { pageProps, auth: true };
};

export default withApollo(CustomApp);
