import React from 'react'
import styles from "./productListItem.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IProduct, getFirstImg } from '../../../../helpers/types/responces/products'
import config from '../../../../config'
type productProps = {
  product: IProduct;
}
// type headerState = {
//   headerBanner?: string
// }
export default class ProductListItem extends React.Component<productProps> {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      return (
      <div className={styles.container}>
        <Link
          href={{
              pathname: '/product/' + this.props.product.id,
          }}>
          <a>
            <div className={styles.image}>
              <Image
                src={config.apiUrl + getFirstImg(this.props.product)}
                alt="Produt"
                layout="fill"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.description}>
                {this.props.product.description}
              </div>
              <div className={styles.price}>
                {this.props.product.price} ₴
              </div>
            </div>
          </a>
        </Link>
      </div>)
    }
  }