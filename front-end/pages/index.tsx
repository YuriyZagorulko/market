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

interface IProps {
  login: any
  dispatch: any
}
interface IState {
  recomended: IProduct [],
  popular: IProduct [],
}
class HomePage extends React.Component<IProps, IState> {
  constructor(props){
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
          no content
        </div>
      }
  }
  render () {
    return (
    <div className={styles.container  + ' global-width-limiter'}>
      <div className={styles.head}>
        <CategoriesSidebar/>
        <HomeHeader/>
      </div>
      <div className={styles.content}>
       {this.productLines()}
      </div>
    </div>
  )
  }
}
const connectedHomePage = connect(state => state)(HomePage)
export  default connectedHomePage