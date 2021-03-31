import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
 * SSR config for styled components
 * https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
 */

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    {/* TODO Is the practicality of loading all the fonts always worth the performance impact?*/}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
