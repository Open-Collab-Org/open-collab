import { createGlobalStyle, ThemeProvider } from 'styled-components';
import light from '@themes/light';
import { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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
