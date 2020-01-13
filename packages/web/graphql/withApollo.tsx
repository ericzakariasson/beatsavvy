import React from 'react';
import Head from 'next/head';
import {
  AppContextType,
  NextComponentType,
  AppInitialProps
} from 'next/dist/next-server/lib/utils';
import { ApolloProps } from '../types/graphql';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'node-fetch';

const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:4000/grahpql';

type InitApolloArgs = [{}];

export const withApollo = (
  App: NextComponentType<AppContextType, AppInitialProps, any>,
  { ssr = true } = {}
) => {
  const WithApollo = ({ apolloClient, apolloState, ...appProps }: any) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <App {...appProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    WithApollo.displayName = `withApollo(${App.displayName})`;
  }

  WithApollo.getInitialProps = async (ctx: AppContextType) => {
    const {
      Component,
      router,
      ctx: { res }
    } = ctx;

    // @ts-ignore
    const apolloClient = (ctx.ctx.apolloClient = initApolloClient());

    const appProps = App.getInitialProps ? await App.getInitialProps(ctx) : {};

    if (res && res.finished) {
      return {};
    }

    if (ssr) {
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apolloClient}>
            <App {...appProps} Component={Component} router={router} />
          </ApolloProvider>
        );
      } catch (error) {
        console.log('Error while running `getDataFromTree`', error);
      }

      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();

    return {
      ...appProps,
      apolloState
    };
  };

  return WithApollo;
};

let apolloClient: ApolloProps = null;

const initApolloClient = (...args: InitApolloArgs) => {
  // Make sure to create a new client for every server-side request
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
};

/* Create ApolloClient */
const createApolloClient = (initialState = {}) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: GRAPHQL_URI as string,
      credentials: 'same-origin',
      // Cast as 'any' workaround ...
      fetch: fetch as any
    }),
    cache: new InMemoryCache().restore(initialState)
  });
};
