import style from './orderItem.module.scss'
import { IProduct } from '../../../helpers/types/responces/products'
import { getProductImg } from '../../../helpers/types/responces/products'
import CustomImg from '../../../components/shared/customImg/customImg'
import {useState} from 'react'


type OrderItemType = {
  el: { quantity: number, product: IProduct }

}
function OrderItem(props: OrderItemType) {
  const [product, setProduct] = useState(null)

  return (
    <div>

      <h4 className={style.collapseItem__descriptionHeader}>Товар:</h4>
      <div className={style.collapseItem__productItem}>
        <div className={style.collapseItem__image}>
          <CustomImg img={getProductImg(product)} />
        </div>

        <a href="#" className={style.collapseItem__descriptionHref}></a>
        <div className={style.collapseItem__productPriceWrapper}>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Ціна:</span>
            <span className={style.collapseItem__productPriceMark}>{props.el.product.price} UAH</span>
          </div>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Кількість:</span>
            <span className={style.collapseItem__productPriceMark}>{props.el.quantity}</span>
          </div>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Сума:</span>
            <span className={style.collapseItem__productPriceMark}>{props.el.quantity * props.el.product.price} UAH</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderItem