import gql from 'graphql-tag'

export const AuthenticationUrlQuery = gql`
  query AuthenticationUrl {
    authenticationUrl
  }
`;
