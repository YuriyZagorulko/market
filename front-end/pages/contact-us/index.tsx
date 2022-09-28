import style from './contact-us.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IProps {
    login: any
    dispatch: any
}
function ContactUsPage () {
  return (
    <div className={"wrapper"}>
      <section className={style.consSect}>
        <div className={style.container}>
            <h1>Консультації та замовлення за телефонами</h1>
            <div className={style.maincontainer}>
          <div className={style.contentContainer}>
              <h3>V16</h3>
              <div className={style.blueText}>0935091447</div>
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
  )
}
const connectedContactUsPage = connect(state => state)(ContactUsPage)
export  default connectedContactUsPage

