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
  title: string
}
function ProductLine (props: productLineProps) {

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>{props.title}</div>
      </div>
      <div className={styles.content}>
        {props.products.map((product: IProduct, index) => {
          if (index < 6) {
            return <div className={styles.product} key={index}>
              <ProductPrev product={product}/>
            </div>
          }
        })}
      </div>

    </div>
  )
}
export default ProductLine