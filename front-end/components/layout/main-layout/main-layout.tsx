import React, { useEffect, useState } from 'react'
import styles from "./main-layout.module.scss"
import Header from  '../header/header'
import Footer from  '../footer/footer'
import CartModal from '../../shared/cartModal/cartModal'
import ExitDialogWindow from '../../shared/exitDialogWindow/ExitDialogWindow'
import { store } from '../../../redux/store'
import Loader from '../../shared/Loader/Loader'
type layoutProps = {
  children?: any,
  name?: string
}

export default function MainLayout (props) {
  const [state, setSate] = useState(store.getState())
  const unsub = store.subscribe(() => {
    setSate(store.getState())
  })
  useEffect(() => {
    return () => unsub()
  })
  return (
      <React.Fragment>
        { state.controls.isLoaderShown &&  <Loader/> }
        <Header/>
        <main className={styles.content}>
          {props.children}
        </main>
        <Footer/>
        <CartModal />
        <ExitDialogWindow/>
      </React.Fragment>
    )
}