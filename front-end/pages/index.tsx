import React, { useEffect, useState } from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Home.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'
import HomeHeader from '../components/pages/home/homeHeader/homeHeader'
import ProductLine from '../components/shared/productLine/productLine'
import { productService } from '../services/product.service'
import CategoriesSidebar from '../components/pages/home/categoriesSidebar/categoriesSidebar'
import { controlsConstants } from '../helpers/constants/controls'
import Loader from '../components/shared/Loader/Loader'
import { IControlsState } from '../redux/reducers/controls.reducer'
import Head from 'next/head';

interface IProps {
  login: any
  dispatch: any
  controls: IControlsState
}
interface IProductsState {
  recomended: IProduct[],
  popular: IProduct[],

}

function productLines(localProducts: IProductsState) {
  if (localProducts && localProducts.recomended) {
    return (
      <React.Fragment>
        <ProductLine products={localProducts.recomended} title={'Рекомендовані товари'} />
        <ProductLine products={localProducts.popular} title={'Популярні'} />
      </React.Fragment>
    )
  } else {
    return <div>
      На жаль, ми не знайшли товарів які можемо вам порекомендувати.
    </div>

  }
}

function HomePage(props: IProps) {
  const [localProducts, setLocalProducts] = useState<IProductsState>({
    recomended: [],
    popular: [],
  })

  const dispatch = props.dispatch


  useEffect(() => {
    productService.mainPage().then((val) => {
      setLocalProducts({
        recomended: val.recomended,
        popular: val.popular,
      })
    }).finally(()=>dispatch({type:controlsConstants.HIDE_LOADER}))
    return (()=>dispatch({type:controlsConstants.SHOW_LOADER}))
  }, [])

  return (
    <>
    <Head>

        <title>Автомагазин V16. Автотовары, автозапчасти и всё для вашего авто по низким ценам и с доставкой.</title>
          <meta name='description' content='Интернет-магазин автотоваров V16: купить аккумулятор, пускозарядные устройства, кабеля, автомасла и аккумуляторы по низким ценам и с доставкой по Украине!'></meta>
            <meta name="robots" content="index, follow"></meta>
              <meta name="keywords" content="аккумулятор,купить моторное масло,акб,купить аккумулятор,гелевый аккумулятор,купити акумулятор,акумулятор,varta аккумулятор,автозапчасти,запчасти,V16,магазин автозапчастей,автомасла,акб тестеры,клеммы аккумулятора"></meta>
                <meta property="og:title"content="Автомагазин V16. Автотовары, автозапчасти и всё для вашего авто по низким ценам и с доставкой." />
                <meta property="og:type" content="website"></meta> 
              <meta property="og:url" content="https://v16.com.ua/"/>
            <meta property="og:image" content="https://v16.com.ua/images/main-logo.svg"/> 
          <meta property="og:description"content="Интернет-магазин автотоваров V16: купить аккумулятор, пускозарядные устройства, кабеля, автомасла и аккумуляторы по низким ценам и с доставкой по Украине!" />
      </Head>
    {props.controls.isLoaderShown ?  <Loader/> :
      <div className={styles.container + ' global-width-limiter'}>
        <div className={styles.head}>
          <CategoriesSidebar />
          <HomeHeader />
        </div>
        <div className={styles.content}>
          {productLines(localProducts)}
        </div>
      </div>}
    </>
  )
}

const connectedHomePage = connect(state => state)(HomePage)
export default connectedHomePage