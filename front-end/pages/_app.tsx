import React, {FC} from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import MainLayout from '../components/layout/main-layout/main-layout'
import '../styles/globals.scss'
// import {AppProps} from 'next/app'
// import {wrapper} from '../redux/store'

// const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
//     <Component {...pageProps} />
// )

// export default wrapper.withRedux(WrappedApp)

export default function App({ Component, pageProps }) {
    return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    )
  }