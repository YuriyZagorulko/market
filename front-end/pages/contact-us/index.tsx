import style from './contact-us.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { storeContacts } from '../../helpers/constants/storeDataConstants/storeContacts'
import Head from 'next/head'
import config from '../../config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


interface IProps {
    login: any
    dispatch: any
}
function ContactUsPage () {
  const router = useRouter()
  const { t : trans} = useTranslation('contact-us')
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
            <h1>{trans('header')}</h1>
            <div className={style.maincontainer}>
          <div className={style.contentContainer}>
              <h3>V16</h3>
              <div className={style.blueText}>{storeContacts.MOBILE_NUMBER}</div>
          </div>
          <div className={style.div_container}>
            <div className={style.contentContainer}>
              <h3>{trans('schedule')}</h3>
              <div>{trans('weekdays')}</div>
              <div>{trans('saturday')}</div>
              <div>{trans('sunday')}</div>
            </div>
            <div className={style.contentContainer}>
              <div>{trans('from')} 08:00 {trans('until')} 21:00</div>
              <div>{trans('from')} 09:00 {trans('until')} 20:00</div>
              <div>{trans('from')} 10:00 {trans('until')} 19:00</div>
            </div>
            </div>
          </div>
      </div>
      </section>
    </div>
    </>
    
   
  )
}
export async function getServerSideProps({ locale }) {
  return {
  props: await serverSideTranslations(locale, ['contact-us','layout','sharedUI']),
  }
}

const connectedContactUsPage = connect(state => state)(ContactUsPage)
export  default connectedContactUsPage

