import React from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Checkout.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'
import { Unsubscribe } from 'redux-saga'
import { Button, Input, Radio } from 'antd'
import { getTotalPrice } from '../redux/reducers/cart.reducer'
import classnames from 'classnames'
import ProductListItem from '../components/shared/product/productListItem/productListItem'
import Router from 'next/router'
import { NPapiService } from '../services/order/NPapi.service'
import { deliveryTypes } from '../helpers/order/order.constants'
interface IProps {
  login: any
  dispatch: any
}
interface IState {
  products: { product: IProduct, quantity: number } []
  storeUnsub: Unsubscribe
  totalPrice: number
  name: string
  surname: string
  selectedShipping: string
}
class CheckoutPage extends React.Component<IProps, IState> {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      surname: '',
      products: [],
      storeUnsub: null,
      totalPrice: 0,
      selectedShipping: deliveryTypes.newPost,
    }
  }
  componentWillUnmount(){
    if (this.state.storeUnsub){
      this.state.storeUnsub()
    }
  }
  componentDidMount() {
    const unsub = store.subscribe(() => {
      const cartState  = store.getState().cart
      if (cartState && cartState.addedProducts){
        if (cartState.addedProducts.length <= 0){
          Router.push('/')
        }
        this.setState({
          products: cartState.addedProducts,
          totalPrice: getTotalPrice(cartState)
        })
      }
    })
    this.setState({
      storeUnsub: unsub
    })
    const { dispatch } = this.props
    dispatch({ type: productConstants.GETMAIN_REQUEST })
  }
  checkoutOrder = () => {
    NPapiService.getCities('')
  }
  contactInfo(){
    return (
      <div className={styles.contactInfo}>
        <div className={styles.sectionTitle}>
          Контактные данные получателя заказа
        </div>
        <div className={styles.row}>
          <div className={styles.colum50}>
            <label>Фамилия</label>
            <Input className={styles.input} type="text"/>
          </div>
          <div className={styles.colum50}>
            <label>Имя</label>
            <Input className={styles.input} maxLength={1} type="text"/>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.colum50}>
            <label>Телефон</label>
            <Input className={styles.input} prefix="+380" type="number"/>
          </div>
          <div className={styles.colum50}>
            <label>Отчество</label>
            <Input className={styles.input} type="text"/>
          </div>
        </div>
      </div>
    )
  }
  productsList = () => {
    if (this.state.products.length > 0) {
        return (
          <div className={styles.productListWrapper}>
            <div className={styles.sectionTitle}>
              Список товаров
            </div>
            <div className={styles.productList}>
            {this.state.products.map((item, i) => {
              return (
                // <CartProduct
                //   key={item.product.id}
                //   addedProduct={item}
                //   onDelete={this.removeProduct}
                //   onQuantityChange={this.quantityChange}
                // />
                <ProductListItem
                  key={item.product.id}
                  product={ item.product}
                />
              )
            })}
          </div>
          </div>
        )
      } else {
        return <div>Nothing In he cart yet</div>
      }
  }
  sidebar() {
    return (
      <div className={styles.sidebarTotal + ' box-gray'}>
        <h1>Итого</h1>
        <div className={styles.row}>
          <label>
            {this.state.products.length} товаров на сумму
          </label>
          <div className={styles.sum}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <div className={styles.row}>
          <label>
            Стоимость доставки
          </label>
          <div className={styles.alignRight}>
            по тарифам перевозчика
          </div>
        </div>
        <div className={classnames(styles.row, styles.withBorders)}>
          <label>
            К оплате
          </label>
          <div className={classnames(styles.alignRight, styles.totalPrice)}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <Button
          key="submit"
          type="primary"
          className={styles.checkoutOrder}
          onClick={this.checkoutOrder}
        >
          Подтверждаю заказ
        </Button>
      </div>
    )
  }
  shippingSetup(){
    const onChange = e => {
      this.setState({selectedShipping: e.target.value})
    }
    return(
      <div className={styles.shippingContainer}>
        <Radio.Group value={this.state.selectedShipping} onChange={onChange}>
          <div className={
            classnames(
              (this.state.selectedShipping === deliveryTypes.newPost ? styles.selectedShipping : ''),
              styles.shippingOption
            )
          }>
            <Radio value={deliveryTypes.newPost}>NP</Radio>
          </div>
          <Radio value={deliveryTypes.justin}>Justin</Radio>
        </Radio.Group>
      </div>
    )
  }
  render () {
    return (
    <div className={styles.container + ' global-width-limiter'}>
      <div className={styles.content}>
        <h1>Оформление заказа</h1>
        {this.contactInfo()}
        {this.productsList()}
        {this.shippingSetup()}
      </div>
      <div className={styles.sidebar}>
        {this.sidebar()}
      </div>
    </div>
  )
  }
}
const connectedCheckoutPage = connect(state => state)(CheckoutPage)
export  default connectedCheckoutPage