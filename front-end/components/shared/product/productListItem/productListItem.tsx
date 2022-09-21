import React from 'react'
import styles from "./productListItem.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IProduct, getFirstImg, AddedProduct, getPreviewImgUrl } from '../../../../helpers/types/responces/products'
import config from '../../../../config'
import CustomImg from '../../customImg/customImg'
type productProps = {
  product: AddedProduct;
}

export default class ProductListItem extends React.Component<productProps, {} > {
    constructor(props){
      super(props)
      this.state = {}
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
              <CustomImg
                img={getPreviewImgUrl(this.props.product.product)}
                alt="Produt image"
                layout="fill"
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
                Ціна
                </div>
                <div className={styles.price}>
                  {this.props.product.product.price} ₴
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__row__title}>
                Кількість
                </div>
                <div className={styles.content__row__text}>
                  {this.props.product.quantity}
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__row__title}>
                  Сума
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