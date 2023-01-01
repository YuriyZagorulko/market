import style from './orderItem.module.scss'
import { IProduct, getProductImg } from '../../../helpers/types/responces/products'
import CustomImg from '../../../components/shared/customImg/customImg'

type OrderItemType = { details: {quantity: number, product: IProduct} }

function OrderItem(props: OrderItemType) {

  return (
    <div>

      <h4 className={style.collapseItem__descriptionHeader}>Товар:</h4>
      <div className={style.collapseItem__productItem}>
        <div className={style.collapseItem__image}>
          <CustomImg img={getProductImg(props.details.product)} />
        </div>

        <a href="#" className={style.collapseItem__descriptionHref} />
        <div className={style.collapseItem__productPriceWrapper}>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Ціна:</span>
            <span className={style.collapseItem__productPriceMark}>{props.details.product?.price} UAH</span>
          </div>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Кількість:</span>
            <span className={style.collapseItem__productPriceMark}>{props.details.quantity}</span>
          </div>
          <div className={style.collapseItem__productPriceItem}>
            <span className={style.collapseItem__productPriceHeader}>Сума:</span>
            <span className={style.collapseItem__productPriceMark}>{props.details.quantity * props.details.product?.price} UAH</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderItem