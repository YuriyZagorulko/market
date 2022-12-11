import React from 'react'
import styles from "./cartProduct.module.scss"
import { IProduct, getFirstImg, getProductImg } from '../../../../helpers/types/responces/products'
import { connect } from 'react-redux'
import { Unsubscribe } from 'redux-saga'
import { InputNumber } from 'antd'
import Image from 'next/image'
import config from '../../../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import CustomImg from '../../customImg/customImg'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'
import { controlsConstants } from '../../../../helpers/constants/controls'

type IProps = {
  dispatch?: any
  addedProduct: { product: IProduct, quantity: number }
  onDelete: (product: IProduct) => void
  onQuantityChange: (product: IProduct, quantity: number) => void
}
type cartProductState = {
  unsubs: Unsubscribe[]
  quantity: number
}
class CartProduct extends React.Component<IProps, cartProductState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      unsubs: [],
      quantity: props.addedProduct.quantity
    }
  }
  quantityChange = (value) => {
    this.props.onQuantityChange(this.props.addedProduct.product, value)
    this.setState({ quantity: value })
  }
  removeProduct = () => {
    this.props.onDelete(this.props.addedProduct.product)
  }
  handleProductTitleClick = () => {
    this.props.dispatch({ type: controlsConstants.CLOSE_CART })
  }
  render() {
    const product = this.props.addedProduct.product
    const quantity = this.state.quantity
    return (
      <div className={styles.product}>
        <div className={styles.productContent}>
          <div className={styles.productImage}>
            <CustomImg img={getProductImg(product)} />
          </div>
          <Link href={{
            pathname: '/product/' + (product.url ? product.url : product.id)
          }}>
            <a onClick={this.handleProductTitleClick} className={styles.productTitle}>
              {product.title}
            </a>
          </Link>
          <div className={styles.productControls}>
            <div className={styles.productIcon + ' delete'} data-mssg="Hello!" onClick={this.removeProduct}>
              <FontAwesomeIcon icon={faTrashAlt as IconProp} />
            </div>
          </div>
        </div>
        <div className={styles.productFooter}>
          <div className={styles.productQuantity}>
            <InputNumber min={1} max={1000} defaultValue={quantity} onChange={this.quantityChange} />
          </div>
          <div className={styles.productPrice}>
            ₴{quantity * product.price}
          </div>
        </div>
      </div>
    )

  }
}


const connectedCartProduct = connect<cartProductState, {}, IProps>((state: cartProductState) => state)(CartProduct as any)
export default connectedCartProduct