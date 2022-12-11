import React, { JSXElementConstructor, ReactNode } from 'react'
import styles from "./cartModal.module.scss"
import { IProduct, getFirstImg } from '../../../helpers/types/responces/products'
import Modal from 'antd/lib/modal/Modal'
import { connect } from 'react-redux'
import { store } from '../../../redux/store'
import { IControlsState } from '../../../redux/reducers/controls.reducer'
import { controlsConstants } from '../../../helpers/constants/controls'
import Button from 'antd/lib/button'
import { Unsubscribe } from 'redux-saga'
import { cartConstants, ICartState } from '../../../redux/reducers/cart.reducer'
import CartProduct from './cartProduct/cartProduct'
import Link from 'next/link'

type IProps = {
  dispatch: any
}
type cartModalState = {
  isVisible: boolean
  unsubs: Unsubscribe []
  cartProducts: {product: IProduct, quantity: number} []
}
enum subsriptions{
  store = 'STORE'
}
class CartModal extends React.Component<IProps, cartModalState> {
    constructor(props){
      super(props)
      this.state = {
        isVisible: false,
        cartProducts: [],
        unsubs: []
      }
      this.state.unsubs[subsriptions.store] =  store.subscribe(() => {
        const state = store.getState()
        const controls: IControlsState = state.controls
        const cart: ICartState = state.cart
        if (controls){
          this.setState({
            isVisible: controls.isCartOpened,
          })
        }
        if (cart){
          this.setState({
            cartProducts: cart.addedProducts,
          })
        }
      })
    }
    componentWillUnmount() {
      for (const unsub of this.state.unsubs){
        unsub()
      }
    }
    handleOk = () => {
      this.props.dispatch({type: controlsConstants.CLOSE_CART})
      // this.setState({isVisible: false})
    }
    handleCancel = () => {
      this.props.dispatch({type: controlsConstants.CLOSE_CART})
    }
    quantityChange = (product: IProduct, quantity) => {
      this.props.dispatch({type: cartConstants.CHANGE_QUANTITY, product, quantity})
    }
    removeProduct = (product: IProduct) => {
      this.props.dispatch({type: cartConstants.REMOVE_PRODUCT, product})
    }
    productsList = () => {
      if (this.state.cartProducts.length > 0) {
          return (
            <ul className={styles.productList}>
              {this.state.cartProducts.map((item) => {
                return (
                  <li key={item.product.id}>
                    <CartProduct
                      addedProduct={item}
                      onDelete={this.removeProduct}
                      onQuantityChange={this.quantityChange}
                    />
                  </li>

                )
              })}
            </ul>
          )
        } else {
          return <div>Корзина порожня...</div>
        }
    }
    render() {
      return (
        <div className={styles.container}>
          <Modal
            className={'cart-modal'}
            title="Корзина"
            open={this.state.isVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose
            width={'800px'}
            footer={[
              <div className={styles.buttonsWrapper} key={1}>
                <Button
                  type="primary"
                  className={'cart-btn'}
                  onClick={this.handleOk}
                >
                  Продовжити покупки
                </Button>
                { (this.state.cartProducts.length > 0) && (
                  <Link href="/checkout">
                    <Button
                      type="primary"
                      className={'cart-btn'}
                      onClick={this.handleOk}
                    >
                      Оформити замволення
                    </Button>
                  </Link>
                )}

              </div>
            ]}

          >
            {this.productsList()}
          </Modal>
        </div>
      )
    }
  }


const connectedCartModal = connect(state => state)(CartModal as any)
export default connectedCartModal