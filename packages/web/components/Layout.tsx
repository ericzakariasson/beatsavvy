import * as React from 'react';
import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  height: 100vh;
  background: #f7f7f7;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StyledLayout>
        {/* Just a little something to fill the page with. */}
        <Header />
        {children}
      </StyledLayout>
    </>
  );
};

export default Layout;
