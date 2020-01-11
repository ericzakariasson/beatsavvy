import gql from 'graphql-tag';

export const ExampleQuery = gql`
query AllPosts {
	allPosts(first: 20) {
    title
  }
}
`