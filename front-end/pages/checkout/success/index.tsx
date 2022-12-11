import style from './success.module.scss'
import React, { useState } from 'react'
import { Button } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Head from 'next/head'

interface IProps {
  login: any
  dispatch: any
}
function ContactUsPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })

  return (
    <>
      <Head>
        <title>V16 — Заказ подтверждён | Интернет-магазин автотоваров V16</title>
        <meta name="robots" content="noindex,nofollow"/>
        <meta name='description' content='Заказ принят. Ожидайте прибытие товара.'/>
        <meta name="keywords" content=''/>
      </Head>

      <div className={style.container}>
        <div className={style.topIcon}>
          <FontAwesomeIcon icon={faCheckCircle as IconProp} />
        </div>
        <h1>Дякуємо за ваше замовлення</h1>
        <h4>Ми зв'яжемося з вами найближчим часом</h4>
        <Link href="/">
          <Button type="primary">
            На головну сторінку
          </Button>
        </Link>
      </div>
    </>

  )
}
const connectedContactUsPage = connect(state => state)(ContactUsPage)
export default connectedContactUsPage