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
  const dispatch = useDispatch()
  const router = useRouter()
  const [{isDisabledButton}, setSate] = useState({
    isDisabledButton: false
  })

  return (
    
    <div className={"wrapper"}>
      <section className={style.consSect}>
        <div className={style.container}>
            <h1>Консультации и заказ по телефонам</h1>
            <div className={style.maincontainer}>
          <div className={style.contentContainer}>
              <h3>Rozetka</h3>
              <div className={style.blueText}>044 537 02 22</div>
              <div className={style.blueText}>044 503 80 80</div>
          </div>
          
          
          <div className={style.div_container}>
            <div className={style.contentContainer}>
              <h3>График работы</h3>
              <div>В будни</div>
              <div>Суббота</div>
              <div>Воскресенье</div>
            </div>

              <div className={style.contentContainer}>
                <div>с 08:00 до 21:00</div>
                <div>с 09:00 до 20:00</div>
                <div>с 10:00 до 19:00</div>
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

