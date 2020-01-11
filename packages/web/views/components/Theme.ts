import { createGlobalStyle } from 'styled-components';

export const theme = {
    aColor: '#f9f9f9'
}

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html {
    font-size: 16px;
    overflow-x: hidden;
  }
  body  {
    background: ${theme.aColor};
  }
`;