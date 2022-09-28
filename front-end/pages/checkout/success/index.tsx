import style from './success.module.scss'
import React, { useState } from 'react'
import { Button } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

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
        <FontAwesomeIcon icon={faCheckCircle as IconProp} />
      </div>
      <h1>Дякую за вашу покупку</h1>
      <h4>Ми зв'яжемося з вами найближчим часом</h4>
      <Link href="/">
        <Button type="primary">
          На головну сторінку
        </Button>
      </Link>
    </div>
  )
}
const connectedContactUsPage = connect(state => state)(ContactUsPage)
export  default connectedContactUsPage