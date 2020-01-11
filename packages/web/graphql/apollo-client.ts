import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch'

import { ApolloLink } from 'apollo-link'
import { HttpLink, FetchOptions, } from 'apollo-link-http'

// const GRAPHQL_URL = '/graphql';
const GRAPHQL_URL = 'https://48p1r2roz4.sse.codesandbox.io';

const link = new HttpLink({
    uri: GRAPHQL_URL,
    // Cast as any workaround.
    fetch: fetch as any,
    credentials: 'same-origin',
})

const cache = new InMemoryCache()

export const apollo = new ApolloClient({
    ssrMode: true,
    link,
    cache
})

