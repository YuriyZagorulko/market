import style from './order-line.module.scss'
import { IOrder } from '../../../helpers/types/orders'
import { useState } from 'react'
import OrderItem from '../order-item/OrderItem'
import { getProductImg } from '../../../helpers/types/responces/products'
import CustomImg from '../../../components/shared/customImg/customImg'
import Image from 'next/image'
import { orderStatuses } from '../../../helpers/constants/order.constants'


type OrderProps = {
  order: IOrder;
}

function OrderLine(props: OrderProps) {
  const [isActive, setIsActive] = useState(false)

  function onCollapseItemClick() {
    setIsActive(!isActive)
  }

  if (props.order?.phoneNumber?.length < 0) {
    return (<></>)
  }

  const orderStatus = (status: string) => {
    return (
      <div className={style.orderStatus}>
        <div className={style.statusLine} style={{backgroundColor: orderStatuses[status]?.color}} />
        <div>{orderStatuses[status]?.name}</div>
      </div>
    )
  }

  return (
    <li onClick={onCollapseItemClick} className={style.collapseItem}>
      <div className={style.collapseItem__titleWrapper}>
        <div className={style.collapseItem__priceHeader} ><div>Статус замовлення:</div> {orderStatus(props.order.orderStatus)}</div>
        <div className={isActive ? style.collapseItem__priceWrapperActive : style.collapseItem__priceWrapper}>
          <span className={style.collapseItem__priceHeader}>Вартість замовлення:</span>
          <span className={style.collapseItem__price}>{props.order.details[0]?.quantity * props.order.details[0]?.product.price} UAH</span>
        </div>
        <div className={isActive ? style.collapseItem__imagesWrapperActive : style.collapseItem__imagesWrapper}>
          <div className={style.collapseItem__image}>
            <CustomImg img={getProductImg(props.order.details[0]?.product)} />
          </div>
        </div>
        <Image
          width="15px"
          height="18px"
          alt='chevron'
          src='/images/icons/downArrow.svg'
          className={isActive ? style.collapseItem__chevronActive : style.collapseItem__chevron}
        />
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
          {props.order.details.map(el => <OrderItem key={el.product.id} details={el} />

          )}
        </div>
      </div>
    </li>
  )
}
export default OrderLine