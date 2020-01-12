import React from 'react';
import Head from 'next/head';
import App, { AppContext } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { ApolloProps, Token } from '../types/graphql';

// import cookie from 'js-cookie';

let globalApolloClient: ApolloProps;

// const getToken = () => {
//   let token: Token = null;
//   if (process.browser) {
//     token = `Bearer ${cookie.get(`${process.env.TOKEN as string}`)}`;
//   }
//   return token;
// };

export function withApollo(Component, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  };

  if (ssr || Component.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // @ts-ignore
      const apolloClient: ApolloProps = (ctx.apolloClient = initApolloClient());

      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      if (typeof window === 'undefined') {
        if (ctx.res?.finished) {
          return pageProps;
        }

        if (ssr) {
          try {
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            throw new Error(error);
          }

          Head.rewind();
        }
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

function initApolloClient(initialState) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      // headers: {
      //   authorization: getToken() || null
      // },
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin',
      // Cast as 'any' workaround ...
      fetch: fetch as any
    }),
    cache: new InMemoryCache().restore(initialState)
  });
}
