import React from 'react'
import styles from "./productListItem.module.scss"
import "./productListItem.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IProduct, getFirstImg, AddedProduct } from '../../../../helpers/types/responces/products'
import config from '../../../../config'
type productProps = {
  product: AddedProduct;
}
type productItemState = {
  isImageError: boolean
}


export default class ProductListItem extends React.Component<productProps, productItemState > {
    constructor(props){
      super(props)
      this.state = {
        isImageError: false
      }
    }
    imageErrorHandler = () => {
      this.setState({
        isImageError: true
      })
    }
    render() {
      return (
      <div className={styles.container}>
        <Link
          href={{
              pathname: '/product/' + this.props.product.product.id,
          }}>
          <a>
            <div className={styles.image}>
              <Image
                src={ !this.state.isImageError ? config.apiUrl + getFirstImg(this.props.product.product) : '/images/icons/shared/product-default.svg'}
                alt="Produt image"
                layout="fill"
                onError={this.imageErrorHandler}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.content__row}>
                <div className={styles.description + ' link-blue'}>
                  {this.props.product.product.title}
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__row__title}>
                  Цена
                </div>
                <div className={styles.price}>
                  {this.props.product.product.price} ₴
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__row__title}>
                  Количество
                </div>
                <div className={styles.content__row__text}>
                  {this.props.product.quantity}
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__row__title}>
                  Сумма
                </div>
                <div className={styles.content__row__text}>
                    {this.props.product.quantity * this.props.product.product.price}
                </div>
              </div>

            </div>
          </a>
        </Link>
      </div>)
    }
  }