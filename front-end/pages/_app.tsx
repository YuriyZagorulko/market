import React, {FC, useEffect, useState} from 'react'
import { connect, Provider } from 'react-redux'
import { store } from '../redux/store'
import MainLayout from '../components/layout/main-layout/main-layout'
import '../styles/globals.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Loader from '../components/shared/Loader/Loader'

export default function App({ Component, pageProps }) {

  const [state, setSate] = useState(store.getState())
  const unsub = store.subscribe(() => {
    setSate(store.getState())
  })
  useEffect(() => {
    return () => unsub()
  })
    return (
      <Provider store={store}>
        <>
          { state.controls.isLoaderShown &&  <Loader/> }
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </>
      </Provider>
    )
  }
 