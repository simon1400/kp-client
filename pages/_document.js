import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="cs">
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJZC2F3" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }} />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          
        </body>
      </Html>
    )
  }
}
