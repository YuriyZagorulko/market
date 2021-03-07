import React from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Home.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'

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
        checkout content
    </div>
  )
  }
}
const connectedHomePage = connect(state => state)(HomePage)
export  default connectedHomePage