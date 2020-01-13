import gql from 'graphql-tag'

export const CallbackQuery = gql`
  query CallbackQuery($state: String!, $code: String!) {
    authenticate(state: $state, code: $code) {
      token
    }
  }
`