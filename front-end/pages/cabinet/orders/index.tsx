import style from './Login.module.scss'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'

interface IProps {
    login: any
    dispatch: any
}
function OrdersPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{isDisabledButton}, setSate] = useState({
    isDisabledButton: false
  })

  return (
      <div>
        cabinet page
      </div>
  )
}
const connectedOrdersPage = connect(state => state)(OrdersPage)
export  default connectedOrdersPage