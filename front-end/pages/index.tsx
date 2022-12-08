import React from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Home.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'
import HomeHeader from '../components/pages/home/homeHeader/homeHeader'
import ProductLine from '../components/shared/productLine/productLine'
import { productService } from '../services/product.service'
import CategoriesSidebar from '../components/pages/home/categoriesSidebar/categoriesSidebar'
import Head from 'next/head';

interface IProps {
  login: any
  dispatch: any
}
interface IState {
  recomended: IProduct[],
  popular: IProduct[],
}
class HomePage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch({ type: productConstants.GETMAIN_REQUEST })
    productService.mainPage().then((val) => {
      this.setState({
        recomended: val.recomended,
        popular: val.popular
      })
    })
  }

  productLines() {
    if (this.state && this.state.recomended) {
      return (
        <React.Fragment>
          <ProductLine products={this.state.recomended} title={'Рекомендовані товари'} />
          <ProductLine products={this.state.popular} title={'Популярні'} />
        </React.Fragment>
      )
    } else {
      return <div>
        no content
      </div>
    }
  }
  render() {
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
        <div className={styles.container + ' global-width-limiter'}>
          <div className={styles.head}>
            <CategoriesSidebar />
            <HomeHeader />
          </div>
          <div className={styles.content}>
            {this.productLines()}
          </div>
        </div>
      </>



    )
  }
}
const connectedHomePage = connect(state => state)(HomePage)
export default connectedHomePage