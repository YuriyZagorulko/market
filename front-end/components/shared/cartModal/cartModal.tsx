import React from 'react'
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
import { InputNumber } from 'antd'
import Image from 'next/image'
import config from '../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

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
    quantityChange = (value) => {
      console.log('changed', value)
    }
    removeProduct(product: IProduct){
      this.props.dispatch({type: cartConstants.REMOVE_PRODUCT, product})
    }
    productsList = () => {
      if (this.state.cartProducts.length > 0) {
          return (
            <div>{this.state.cartProducts.map((item, i) => {
              return (
                <div key={item.product.id} className={styles.product}>
                  <div className={styles.productContent}>
                    <div className={styles.productImage}>
                      <Image
                        src={config.apiUrl + getFirstImg(item.product)}
                        alt="Produt"
                        layout="fill"
                      />
                    </div>
                    <div className={styles.productTitle}>
                      {item.product.title}
                    </div>
                    <div className={styles.productControls}>
                      <div className={styles.productIcon + ' delete'} data-mssg="Hello!" onClick={() => this.removeProduct(item.product)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.productFooter}>
                    <div className={styles.productQuantity}>
                      <InputNumber min={1} max={100} defaultValue={item.quantity} onChange={this.quantityChange} />
                    </div>
                    <div className={styles.productPrice}>
                      ₴{item.quantity * item.product.price}
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )
        } else {
          return <div>Nothing In he cart yet</div>
        }
    }
    render() {
      return (
      <div className={styles.container}>
        <Modal
          className={'cart-modal'}
          title="Корзина"
          visible={this.state.isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          width={'800px'}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Оформить Заказ
            </Button>
          ]}
        >
          {this.productsList()}
        </Modal>
      </div>)
    }
  }

const connectedCartModal = connect(state => state)(CartModal)
export default connectedCartModal