import * as React from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

import { useQuery } from '@apollo/react-hooks';
import { ExampleQuery } from '../../graphql/queries/example2';

const StyledPosts = styled.div`
  height: 100vh;
  background: #f7f7f7;
`;

const Post: React.FC = () => {
  const { error, data, loading } = useQuery(ExampleQuery);

  if (loading) return null;
  if (error) return null;

  return (
    <StyledPosts>
      <ul style={{ margin: '1rem' }}>
        {data.allPosts.map(({ title }) => (
          <li style={{ padding: '0.4rem' }} key={title}>
            {title}
          </li>
        ))}
      </ul>
    </StyledPosts>
  );
};

export default Post;
