import React, {FC} from 'react'
import { connect, Provider } from 'react-redux'
import { store } from '../redux/store'
import MainLayout from '../components/layout/main-layout/main-layout'
import '../styles/globals.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export default function App({ Component, pageProps }) {

    return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    )
  }
