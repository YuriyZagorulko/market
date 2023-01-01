import React, {FC} from 'react'
import { connect, Provider } from 'react-redux'
import { store } from '../redux/store'
import MainLayout from '../components/layout/main-layout/main-layout'
import '../styles/globals.scss';
import 'swiper/scss';
import { appWithTranslation } from "next-i18next";


function App({ Component, pageProps }) {
    return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    )
  }
  
export default appWithTranslation(App)
