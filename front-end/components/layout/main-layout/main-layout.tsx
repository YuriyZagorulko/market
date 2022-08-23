import React from 'react'
import styles from "./main-layout.module.scss"
import Header from  '../header/header'
import Footer from  '../footer/footer'
import Head from 'next/head'
import CartModal from '../../shared/cartModal/cartModal'
import Script from 'next/script'
type layoutProps = {
  children?: any,
  name?: string
}

export default class MainLayout extends React.Component<layoutProps> {
    render() {
        return (
            <div>
              <Head>
                <title>V16</title>
                <link rel="icon" href="/favicon.ico" />
                <Script id="google-tag-manager" strategy="afterInteractive">
                  {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KWBH2RX');
                  `}
                </Script>
              </Head>
              <Header/>
              <div className={styles.content}>
                {this.props.children}
              </div>
              <Footer/>
              <CartModal />
            </div>
          )
    }
  }