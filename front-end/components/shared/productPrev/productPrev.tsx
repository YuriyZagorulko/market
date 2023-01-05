import React from 'react'
import styles from "./productPrev.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IProduct, getPreviewImgUrl } from '../../../helpers/types/responces/products'
import config from '../../../config'
import CustomImg from '../customImg/customImg'
type productProps = {
  product: IProduct
}
type previewState = {
  isImageError: boolean
}
export default class ProductPrev extends React.Component<productProps, previewState> {
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
      <Link href={{
            pathname: '/product/' + (this.props.product.url ? this.props.product.url : this.props.product.id)
          }}>
        <a className={styles.content}>
          <div className={styles.image}>
            <CustomImg img={getPreviewImgUrl(this.props.product)} />
          </div>
          <div className={styles.description}>
            {this.props.product.title}
          </div>
          <div className={styles.price}>
            {this.props.product.price} ₴
          </div>
        </a>
      </Link>
    </div>)
  }
}