import style from './contact-us.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { storeContacts } from '../../helpers/constants/storeDataConstants/storeContacts'
import Head from 'next/head'
import config from '../../config'


interface IProps {
    login: any
    dispatch: any
}
function ContactUsPage () {
  const router = useRouter()
  return (
    <>
     <Head>
        <title>Контакты: интернет-магазин автотоваров V16</title>
          <meta name='description' content={`Контактная информация онлайн магазина автотоваров V16 (В16) ✓ Консультации по телефону ☎ (${storeContacts.MOBILE_NUMBER})  ✓  Большой выбор ✓  Гарантия ✓  Доставка по всей Украине`}></meta>
            <meta name="robots" content="index, follow"></meta>
              <meta name="keywords" content="V16, В16, интернет-магазин автотоваров, контакты, время работы"></meta>
                <meta property="og:title"content=">Контакты: интернет-магазин автотоваров V16" />
                <meta property="og:type" content="website"></meta> 
              <meta property="og:url" content={`${config.mainDomain}${router.pathname}`}/>
            <meta property="og:image" content="https://v16.com.ua/images/main-logo.svg"/> 
          <meta property="og:description"content={`Контактная информация онлайн магазина автотоваров V16 (В16) ✓ Консультации по телефону ☎ (${storeContacts.MOBILE_NUMBER})  ✓  Большой выбор ✓  Гарантия ✓  Доставка по всей Украине`} />
      </Head>
      <div className={"wrapper"}>
      <section className={style.consSect}>
        <div className={style.container}>
            <h1>Консультації та замовлення за телефонами</h1>
            <div className={style.maincontainer}>
          <div className={style.contentContainer}>
              <h3>Телефони:</h3>
              <div className={style.blueText}>{storeContacts.MOBILE_NUMBER}</div>
          </div>
          <div className={style.div_container}>
            <div className={style.contentContainer}>
              <h3>Графік роботи</h3>
              <div>У будні</div>
              <div>Субота</div>
              <div>Неділя</div>
            </div>
            <div className={style.contentContainer}>
              <div>з 08:00 до 21:00</div>
              <div>з 09:00 до 20:00</div>
              <div>з 10:00 до 19:00</div>
            </div>
            </div>
          </div>
      </div>
      </section>
    </div>
    </>
    
   
  )
}
const connectedContactUsPage = connect(state => state)(ContactUsPage)
export  default connectedContactUsPage

