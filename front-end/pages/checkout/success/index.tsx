import style from './success.module.scss'
import React, { useState } from 'react'
import { Button } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
    login: any
    dispatch: any
}
function ContactUsPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{isDisabledButton}, setSate] = useState({
    isDisabledButton: false
  })

  return (
    <div className={style.container}>
      <div className={style.topIcon}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <h1>Спасибо за вашу покупку</h1>
      <h4>Мы свяжемся с вами в ближайшее время</h4>
      <Link href="/">
        <Button type="primary">
          На главную страницу
        </Button>
      </Link>
    </div>
  )
}
const connectedContactUsPage = connect(state => state)(ContactUsPage)
export  default connectedContactUsPage