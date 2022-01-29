import style from './Login.module.scss'
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'
import { OrderService } from '../../../services/order/order.service'

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
  const selector = useSelector(state => {
    OrderService.getOrders().then((data) => {
        console.log(data)
    })
  })

  return (
      <div>
        cabinet page
      </div>
  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export  default connectedOrdersPage