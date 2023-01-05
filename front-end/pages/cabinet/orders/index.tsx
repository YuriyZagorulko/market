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
import Loader from '../../../components/shared/Loader/Loader'
import { controlsConstants } from '../../../helpers/constants/controls'
import { IControlsState } from '../../../redux/reducers/controls.reducer'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



interface IProps {
  login: any
  dispatch: any
  controls: IControlsState
}
function OrdersPage(props: IProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const {t: trans} = useTranslation('orders')
  const [{ orders }, setSate] = useState({
    orders: []

  })

  useEffect(() => {
    OrderService.getOrders().then((val) => {
      setSate({
        orders: val.data.data
      })
    }).finally(() => dispatch({ type: controlsConstants.HIDE_LOADER }))
    return () => { dispatch({ type: controlsConstants.SHOW_LOADER }) }
  }, [])
  return (
    <>
      <Head>
        <title>V16 — Мои заказы | Личный кабинет</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>
      {props.controls.isLoaderShown ? <Loader /> :
        <div className={'global-width-limiter' + ' ' + 'orders-wrapper'} >
          <div className={style.headerWrapper}>
            <h1 className={style.orderHeader}>{trans('header')}</h1>
          </div>
          <ul className={style.orderListWrapper}>
            {orders.map(el => <OrderLine order={el} key={el.id} />)}
          </ul>
        </div>}
    </>

  )
}
export async function getServerSideProps({ locale }) {
  return {
  props: await serverSideTranslations(locale, ['orders','layout','sharedUI']),
  }
}

const connectedOrdersPage = connect(state => state)(OrdersPage)
export default connectedOrdersPage