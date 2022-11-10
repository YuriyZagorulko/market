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