import style from './order-line.module.scss'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'
import { OrderService } from '../../../services/order/order.service'
import OrderLine from '../../../components/orders/order-line/order-line'

interface IProps {
    login: any
    dispatch: any
}
function OrdersPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{orders}, setSate] = useState({
    orders: []
  })
  useEffect(() => {
    OrderService.getOrders().then((val) => {
      setSate({
        orders: val.data
      })
      console.log(orders)
  })
  }, [])

  return (
      <div className={'global-width-limiter'}>
        <OrderLine order={null}/>
      </div>
  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export  default connectedOrdersPage