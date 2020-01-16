import gql from 'graphql-tag';

export const authenticateMutation = gql`
  mutation Authenticate($state: String!, $code: String!) {
    authenticate(state: $state, code: $code) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
}

export interface AuthenticateResponse {
  authenticate: Authenticate;
}

export interface Authenticate {
  user: User;
  token: string;
}
