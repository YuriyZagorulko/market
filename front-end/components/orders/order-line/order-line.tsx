import React from 'react'
// import styles from "./productListItem.module.scss"
import style from '../order-line/order-line.module.scss'
import { IOrder } from '../../../helpers/types/orders'
import { useState } from 'react'
import OrderItem from '../order-item/OrderItem'
import { getProductImg } from '../../../helpers/types/responces/products'
import CustomImg from '../../../components/shared/customImg/customImg'


type OrderProps = {
  order: IOrder;
}
type productItemState = {
  isImageError: boolean
}

function OrderLine(props: OrderProps) {
  const [isActive, setIsActive] = useState(false)
  const [product, setProduct] = useState(null)


  function onCollapseItemClick() {
    setIsActive(!isActive)
  }


  if (props.order?.phoneNumber?.length < 0) {
    return (<></>)
  }


  return (

    <div>
      <div onClick={onCollapseItemClick} className={style.collapseItem}>
        <div className={style.collapseItem__titleWrapper}>
          <div className={style.collapseItem__priceHeader} >Тип заказу:<h3 className={style.collapseItem__header}>{props.order.orderType}</h3></div>
          <div className={isActive ? style.collapseItem__priceWrapperActive : style.collapseItem__priceWrapper}>
            <span className={style.collapseItem__priceHeader}>Вартість заказу:</span>
            <span className={style.collapseItem__price}>{props.order.details[0]?.quantity * props.order.details[0]?.product.price} UAH</span>
          </div>
          <div className={isActive ? style.collapseItem__imagesWrapperActive : style.collapseItem__imagesWrapper}>
            <div className={style.collapseItem__image}>
              <CustomImg img={getProductImg(product)} />
            </div>
          </div>
          <img src='/images/icons/downArrow.svg' className={isActive ? style.collapseItem__chevronActive : style.collapseItem__chevron} />
        </div>
        <div className={isActive ? style.collapseItem__contentActive : style.collapseItem__content}>
          <div className={style.collapseItem__adressInformation}>
            <h4 className={style.collapseItem__descriptionHeader}>Інформація про замовлення</h4>
            <div className={style.collapseItem__adressDetailsWrapper}>
              <div className={style.collapseItem__deliveryCityDetailsHeader}>Місто доставки:</div>
              <span className={style.collapseItem__deliveryAdressDetails}>{props.order.city}</span>
              <div className={style.collapseItem__deliveryCityDetailsHeader}>Адреса доставки:</div>
              {props.order.officeDescription.length ? <div className={style.collapseItem__deliveryAdressDetails}>{props.order.officeDescription}</div> :
                <div className={style.collapseItem__deliveryAdressDetails}>Вулиця Лебедина, будинок № 63, квартира № 44</div>}


            </div>
            <div className={style.collapseItem__deliveryCityDetailsHeader}>Отримувач:</div>
            <div className={style.collapseItem__recipientNameWrapper}>
              <p className={style.collapseItem__recipientName}>{props.order.recipientName}</p>
              <p className={style.collapseItem__recipientName}>{props.order.recipientSecondName}</p>
              <p className={style.collapseItem__recipientName}>{props.order.recipientSurname}</p>

            </div>
          </div>
          <div className={style.collapseItem__productInformation}>
            {props.order.details.map(el => <OrderItem key={el.product.id} el={el} />

            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderLine