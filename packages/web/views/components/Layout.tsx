import * as React from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  height: 100vh;
  padding: 1rem 2rem;
`;

const Layout: React.FC = ({ children }) => (
  <StyledLayout>
    <Header />
    {children}
  </StyledLayout>
);

export default Layout;
