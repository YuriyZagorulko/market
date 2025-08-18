import style from './Orders.module.scss'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderService } from '../../../services/order/order.service'
import OrderLine from '../../../components/orders/order-line/order-line'
import { IControlsState } from '../../../redux/reducers/controls.reducer'
import Head from 'next/head'



interface IProps {
  login: any
  dispatch: any
  controls: IControlsState
}
function OrdersPage(props: IProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{ orders }, setSate] = useState({
    orders: []
  })

  useEffect(() => {
    OrderService.getOrders().then((val) => {
      if(val.data) {
        setSate({
          orders: val.data.data
        })
      }
    })
  }, [])
  return (
    <>
      <Head>
        <title>V16 — Мои заказы | Личный кабинет</title>
        <meta name="robots" content="noindex,nofollow"/>
        <meta name='description' content=''/>
        <meta name="keywords" content=''/>
      </Head>
      <div className={'global-width-limiter' + ' ' + 'orders-wrapper'} >
        <div className={style.headerWrapper}>
          <h1 className={style.orderHeader}>Мої замовлення</h1>
        </div>
        { orders?.length > 0 ? (
          <ul className={style.orderListWrapper}>
            {orders.map(el => <OrderLine order={el} key={el.id} />)}
          </ul>
        ) : (
          <div>Замовлень поки що не має...</div>
        )}
      </div>
    </>

  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export default connectedOrdersPage