import style from './success.module.scss'
import React, { useState } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import Link from 'next/link'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

function ContactUsPage() {
  const { t : trans } = useTranslation('checkout')

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
        <h1>{trans("shipping.succes.thanksForOrder")}</h1>
        <h4>{trans("shipping.succes.weWillContactYou")}</h4>
        <Link href="/">
          <Button type="primary">
          {trans("shipping.succes.goToMainPage")}
          </Button>
        </Link>
      </div>
    </>

  )
}

export async function getServerSideProps({ locale }) {
  return {
  props: await serverSideTranslations(locale, ['checkout','layout','sharedUI']),
  }
}


const connectedContactUsPage = connect(state => state)(ContactUsPage)
export default connectedContactUsPage