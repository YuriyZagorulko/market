import style from './Orders.module.scss'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'
import { OrderService } from '../../../services/order/order.service'
import OrderLine from '../../../components/orders/order-line/order-line'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'

interface IProps {
  login: any
  dispatch: any
}
function OrdersPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{ orders }, setSate] = useState({
    orders: []
  })
  useEffect(() => {
    OrderService.getOrders().then((val) => {
      setSate({
        orders: val.data.data
      })
    })
  }, [])
  return (
    <>
      <Head>
        <title>V16 — Мои заказы | Личный кабинет</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>

      <div className={'global-width-limiter' + ' ' + 'orders-wrapper'} >
        <div className={style.headerWrapper}>
          <h1 className={style.orderHeader}>Мої замовлення</h1>
        </div>
        <ul className={style.orderListWrapper}>
          {orders.map(el => <OrderLine order={el} key={el.id} />)}
        </ul>
      </div>
    </>

  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export default connectedOrdersPage