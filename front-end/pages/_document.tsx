import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWBH2RX" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}/>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}