import React from 'react'
import styles from "./main-layout.module.scss"
import Header from  '../header/header'
import Footer from  '../footer/footer'
import Head from 'next/head'
import CartModal from '../../shared/cartModal/cartModal'
import Script from 'next/script'
import ExitDialogWindow from '../../shared/exitDialogWindow/ExitDialogWindow'
type layoutProps = {
  children?: any,
  name?: string
}

export default class MainLayout extends React.Component<layoutProps> {
    render() {
        return (
            <React.Fragment>
              <Header/>
              <div className={styles.content}>
                {this.props.children}
              </div>
              <Footer/>
              <CartModal />
              <ExitDialogWindow/>
            </React.Fragment>
          )
    }
  }