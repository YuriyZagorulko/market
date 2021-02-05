import React from 'react'
import styles from "./main-layout.module.scss"
import Header from  '../header/header'
import Footer from  '../footer/footer'
import Head from 'next/head'
type headerProps = {
  name?: string
}

export default class MainLayout extends React.Component<headerProps> {
    render() {
        return (
            <div>
              <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Header/>
              <div className={styles.content}>
                {this.props.children}
              </div>
              <Footer/>
            </div>
          )
    }
  }