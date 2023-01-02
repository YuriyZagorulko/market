import React from "react";
// import styles from "./productListItem.module.scss"
import style from "../order-line/order-line.module.scss";
import { IOrder } from "../../../helpers/types/orders";
import { useState } from "react";
import OrderItem from "../order-item/OrderItem";
import { getProductImg } from "../../../helpers/types/responces/products";
import Image from "next/image";
import CustomImg from "../../../components/shared/customImg/customImg";
import { useTranslation } from "react-i18next";

type OrderProps = {
  order: IOrder;
};
type productItemState = {
  isImageError: boolean;
};

function OrderLine(props: OrderProps) {
  const [isActive, setIsActive] = useState(false);
  const [product, setProduct] = useState(null);
  const { t: trans } = useTranslation("orders");

  function onCollapseItemClick() {
    setIsActive(!isActive);
  }

  if (props.order?.phoneNumber?.length < 0) {
    return <></>;
  }

  return (
    <li onClick={onCollapseItemClick} className={style.collapseItem}>
      <div className={style.collapseItem__titleWrapper}>
        <div className={style.collapseItem__priceHeader}>
          {trans("orderLine.type")}:
          <h3 className={style.collapseItem__header}>
            {props.order.orderType}
          </h3>
        </div>
        <div
          className={
            isActive
              ? style.collapseItem__priceWrapperActive
              : style.collapseItem__priceWrapper
          }
        >
          <span className={style.collapseItem__priceHeader}>
            {trans("orderLine.price")}:
          </span>
          <span className={style.collapseItem__price}>
            {props.order.details[0]?.quantity *
              props.order.details[0]?.product.price}{" "}
            UAH
          </span>
        </div>
        <div
          className={
            isActive
              ? style.collapseItem__imagesWrapperActive
              : style.collapseItem__imagesWrapper
          }
        >
          <div className={style.collapseItem__image}>
            <CustomImg img={getProductImg(product)} />
          </div>
        </div>
        <Image
          width="15px"
          height="18px"
          alt="chevron"
          src="/images/icons/downArrow.svg"
          className={
            isActive
              ? style.collapseItem__chevronActive
              : style.collapseItem__chevron
          }
        />
      </div>
      <div
        className={
          isActive
            ? style.collapseItem__contentActive
            : style.collapseItem__content
        }
      >
        <div className={style.collapseItem__adressInformation}>
          <h4 className={style.collapseItem__descriptionHeader}>
            {trans("orderLine.info")}
          </h4>
          <div className={style.collapseItem__adressDetailsWrapper}>
            <div className={style.collapseItem__deliveryCityDetailsHeader}>
              {trans("orderLine.city")}:
            </div>
            <span className={style.collapseItem__deliveryAdressDetails}>
              {props.order.city}
            </span>
            <div className={style.collapseItem__deliveryCityDetailsHeader}>
              {trans("orderLine.adress")}:
            </div>
            {props.order.officeDescription.length ? (
              <div className={style.collapseItem__deliveryAdressDetails}>
                {props.order.officeDescription}
              </div>
            ) : (
              <div className={style.collapseItem__deliveryAdressDetails}>
                {trans("orderLine.userStreetAndHouse", {
                  street: props.order.street,
                  house: props.order.house,
                })}{" "}
                {!!props.order.apartament &&
                  trans("orderLine.userApartament", {
                    apartament: props.order.apartament,
                  })}
              </div>
            )}
          </div>
          <div className={style.collapseItem__deliveryCityDetailsHeader}>
            {trans("orderLine.recipient")}:
          </div>
          <div className={style.collapseItem__recipientNameWrapper}>
            <p className={style.collapseItem__recipientName}>
              {props.order.recipientName}
            </p>
            <p className={style.collapseItem__recipientName}>
              {props.order.recipientSecondName}
            </p>
            <p className={style.collapseItem__recipientName}>
              {props.order.recipientSurname}
            </p>
          </div>
        </div>
        <div className={style.collapseItem__productInformation}>
          {props.order.details.map((el) => (
            <OrderItem key={el.product.id} el={el} />
          ))}
        </div>
      </div>
    </li>
  );
}
export default OrderLine;
