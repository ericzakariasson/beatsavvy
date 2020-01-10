import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface StyledTitle {
  color?: string;
}

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.h1<StyledTitle>`
  font-size: 2rem;
  font-family: 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
  display: inline-block;
  margin: 1rem;
  color: ${p => p.color};
`;

const Header = () => (
  <>
    <Head>
      <title>Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <FlexWrap>
      <Title color="crimson">Beatelligence</Title>
      <Title color="darkslategrey">Musiclash</Title>
      <Title color="darkorange">Musiquery</Title>
    </FlexWrap>
  </>
);

export default Header;
