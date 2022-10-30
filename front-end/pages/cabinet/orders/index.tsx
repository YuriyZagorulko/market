import style from './order-line.module.scss'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'
import { OrderService } from '../../../services/order/order.service'
import OrderLine from '../../../components/orders/order-line/order-line'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Loader } from '../../../components/shared/Loader/Loader'
import { controlsConstants } from '../../../helpers/constants/controls'

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
    dispatch({ type: controlsConstants.SHOW_LOADER })
    OrderService.getOrders().then((val) => {
      setSate({
        orders: val.data.data
      })
    }).finally(() => dispatch({ type: controlsConstants.HIDE_LOADER })
    )
  }, [])

  return (
    <>
      <Loader />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px', marginBottom: '15px', padding: '0 15px' }} className={'global-width-limiter orders-wrapper'}>
        {orders.map(el => <OrderLine order={el} key={el.id} />)}
      </div>
    </>
  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export default connectedOrdersPage