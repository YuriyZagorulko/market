import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Автомагазин V16. Автотовары, автозапчасти и всё для вашего авто по низким ценам и с доставкой.</title>
        <link rel="icon" href="/favicon.ico" />
        <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWBH2RX');
          `}}/>
          <meta name='description' content='Интернет-магазин автотоваров V16: купить аккумулятор, пускозарядные устройства, кабеля, автомасла и аккумуляторы по низким ценам и с доставкой по Украине!'></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta name="keywords" content="аккумулятор,купить моторное масло,акб,купить аккумулятор,гелевый аккумулятор,купити акумулятор,акумулятор,varta аккумулятор,автозапчасти,запчасти,V16,магазин автозапчастей,автомасла,акб тестеры,клеммы аккумулятора"></meta>
          <meta property="og:title"content="Автомагазин V16. Автотовары, автозапчасти и всё для вашего авто по низким ценам и с доставкой." />
          <meta property="og:site_name" content="v16.com.ua"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:url" content="https://v16.com.ua/"/>
          <meta property="og:description"content="Интернет-магазин автотоваров V16: купить аккумулятор, пускозарядные устройства, кабеля, автомасла и аккумуляторы по низким ценам и с доставкой по Украине!" />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{ __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWBH2RX" height="0" width="0" 
          style={{ display: 'none', visibility: 'hidden' }}/>`}}/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}