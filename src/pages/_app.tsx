import { createGlobalStyle, ThemeProvider } from 'styled-components';
import light from '@themes/light';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    /* TODO Can't use theme here. Find some way to do it dynamically */
    background-color: #F8F8F8; 
  }
  * {
    box-sizing: border-box;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyle />
        <ThemeProvider theme={light}>
            <Component {...pageProps} />
        </ThemeProvider>
    </>
);

export default App;
