import { AppContext, AppProps, AppInitialProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../../views/components/Theme';
import { withApollo } from '../../graphql/withApollo';

import Layout from '../../views/components/Layout';

interface IAppInitialProps extends AppInitialProps {}

function CustomApp({ Component, pageProps }: AppProps) {
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
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default withApollo(CustomApp);
