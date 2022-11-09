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
        <h2 className={styles.title}>{props.title}</h2>
      </div>
      <ul className={styles.content}>
        {props.products.map((product: IProduct, index) => {
          if (index < 6) {
            return <li className={styles.product} key={index}>
              <ProductPrev product={product}/>
            </li>
          }
        })}
      </ul>

    </div>
  )
}
export default ProductLine