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
import { Loader } from '../components/shared/Loader/Loader'


interface IProps {
  login: any
  dispatch: any
}
interface IState {
  recomended: IProduct [],
  popular: IProduct [],
  isLoaderShown: boolean
}
class HomePage extends React.Component<IProps, IState> {
  isLoaderShown: boolean
  constructor(props){
    super(props)
    this.state ={
      recomended: [],
      popular: [],
      isLoaderShown:true
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch({ type: productConstants.GETMAIN_REQUEST })
    productService.mainPage().then((val) => {
      this.setState({
        recomended: val.recomended,
        popular: val.popular,
        isLoaderShown:false
      })
    })
  }

  productLines(){
    if (this.state && this.state.recomended){
      return (
        <React.Fragment>
          <ProductLine products={this.state.recomended} title={'Рекомендовані товари'} />
          <ProductLine products={this.state.popular} title={'Популярні'} />
        </React.Fragment>
      )
      } else {
        return <div>
          На жаль, ми не знайшли товарів які можемо вам порекомендувати.
        </div>
      }
  }
  render () {
    return (
      <>
      {this.state.isLoaderShown ?  <Loader/> :
    <div className={styles.container  + ' global-width-limiter'}>
      <div className={styles.head}>
        <CategoriesSidebar/>
        <HomeHeader/>
      </div>
      <div className={styles.content}>
       {this.productLines()}
      </div>
    </div>}
    </>
  )
  }
}
const connectedHomePage = connect(state => state)(HomePage)
export  default connectedHomePage