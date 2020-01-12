import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export type ApolloProps = ApolloClient<NormalizedCacheObject> | null;
export type Token = null | string;

// Can we get a global namespace? 
export interface SpotifyUser {
    country: string;
    display_name: string;
    email: string;
    id: string;
}

export interface AuthenticationUrl {
    authenticationUrl: string;
}

export interface LoginCallbackVariables {
    state: string;
    code: string
}

export interface LoginCallbackResponse {
    authenticate: {
        user?: SpotifyUser;
        token: string;
    }
}