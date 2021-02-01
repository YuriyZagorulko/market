import React from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Home.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'
import HomeHeader from '../components/home/homeHeader/homeHeader'

interface IProps {
  login: any
  dispatch: any
}
interface IState {
  products: IProduct [],
}
class HomePage extends React.Component<IProps, IState> {
  constructor(props){
    super(props)

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched),
      // we will update local component state and force component to rerender
      // with new data.

      const temp  = store.getState()
      if (store.getState().product){
        this.setState({
          products: store.getState().product.mainPage
        })
        console.log(store.getState().product.mainPage)
      }
    })
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: productConstants.GETMAIN_REQUEST })
  }
  render () {
    return (
    <div className={styles.container}>
      <div className={styles.head}>
        <HomeHeader/>
      </div>
      <div>
        content
      </div>
    </div>
  )
  }
}
const connectedHomePage = connect(state => state)(HomePage)
export  default connectedHomePage