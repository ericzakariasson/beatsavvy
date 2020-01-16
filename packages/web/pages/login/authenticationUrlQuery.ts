import gql from 'graphql-tag';

export const authenticationUrlQuery = gql`
  query AuthenticationUrl {
    authenticationUrl
  }
`;

export interface AuthenticationUrl {
  authenticationUrl: string;
}
