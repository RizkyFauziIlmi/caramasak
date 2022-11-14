import Document, { Html, Head, Main, NextScript } from "next/document"

export default class CustomDocument extends Document {
    render() {
        return(
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon/favicon.ico"/>
                </Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}