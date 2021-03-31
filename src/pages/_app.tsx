import React from 'react';
import { SWRConfig } from 'swr';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import light from '@themes/light';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  html, 
  body {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  body > div:first-child,
  div#__next {
    height: 100%;
  }
  body {
    background-color: ${props => props.theme.colors.background}; 
  }
  * {
    box-sizing: border-box;
  }
`;

const swrFetcher = (url: string) =>
    axios({
        url,
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
    }).then(res => res.data);

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <ThemeProvider theme={light}>
            <GlobalStyle />
            <SWRConfig value={{ fetcher: swrFetcher }}>
                <Component {...pageProps} />
            </SWRConfig>
        </ThemeProvider>
    </>
);

export default App;
