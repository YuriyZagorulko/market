import style from './Login.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification, FormInstance } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'
import CustomBtn from '../../../components/shared/customBtn/customBtn'
import Head from 'next/head'

function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const formRef = React.createRef<FormInstance>()

  const loginSuccess = (value: { token: string }) => {
    dispatch({ type: authConstants.LOGIN_SUCCESS, value })
    router.push({
      pathname: '/cabinet/orders'
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = () => {
    const data = formRef.current.getFieldsValue()
    userService.login(data).then((val) => {
      console.log(val?.non_field_errors)
      if (val.error === 'Invalid Creds') {
        notification.error({
          message: 'Помилка',
          description:
            'Користувача з таким імейлом і паролем не існує',
        })
      } else {
        if (val.token) {
          loginSuccess(val)
        } else {
          console.log(val)
        }
      }
    })
  }

  return (
    <>
      <Head>
        <title>V16 — Авторизация</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>
      <div className={"wrapper " + style.login}>
        <div className="text-title-xl">
          Вхiд
        </div>
        <div className="">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinishFailed={onFinishFailed}
            ref={formRef}
          >
            <Form.Item
              label="Iмейл"
              labelCol={{ span: 6 }}
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{
                required: true,
                message: 'Будь ласка, введіть свій імейл!',
                pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              labelCol={{ span: 6 }}
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <CustomBtn type="primary" className={'centered-block'} htmlType="submit" onClick={onFinish}>
                Увійти
              </CustomBtn>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Link href="/auth/forgot-password">
            <a>Забули пароль?</a>
          </Link>
        </div>
      </div>
    </>

  )
}
const connectedLoginPage = connect(state => state)(LoginPage)
export default connectedLoginPage