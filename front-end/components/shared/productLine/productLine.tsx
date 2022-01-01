import React from 'react'
import styles from "./productLine.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { IProduct } from '../../../helpers/types/responces/products'
import ProductPrev from '../productPrev/productPrev'

type productLineProps = {
  products: IProduct []
}
// type headerState = {
//   headerBanner?: string
// }
export default class ProductLine extends React.Component<productLineProps> {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      return (
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.title}>Product line title</div>
          </div>
          <div className={styles.content}>
            {this.props.products.map((product: IProduct, index) => {
              if (index < 5) {
                return <div className={styles.product} key={index}>
                  <ProductPrev product={product}/>
                </div>
              }
            })}
          </div>

        </div>
      )
    }
  }