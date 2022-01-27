import style from './Login.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { userService } from '../../../services/user.service'
import { authConstants } from '../../../redux/constants'
import { useRouter } from 'next/router'

interface IProps {
    login: any
    dispatch: any
}
function LoginPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const [{isDisabledButton}, setSate] = useState({
    isDisabledButton: false
  })

  const loginSuccess = (value: { token: string }) => {
    dispatch({ type: authConstants.LOGIN_SUCCESS, value })
    router.push({
        pathname: '/cabinet/orders'
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (data: any) => {
    setSate({isDisabledButton: true})
    setTimeout(() => {
      setSate({isDisabledButton: false})
    }, 4000)
    userService.login(data).then((val) => {
      if (val.detail === 'No active account found with the given credentials') {
        notification.error({
          message: 'Ошибка',
          description:
            'Пользователя с такими имейлом и паролем не существует',
        })
      } else {
        if (val.token) {
          loginSuccess(val)
        }
      }
    })
  }

  return (
    <div className={"wrapper " + style.login}>
      <div className="text-title-xl">
        Вход
      </div>
      <div className="">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Имейл"
            labelCol={{span: 6}}
            name="username"
            wrapperCol={{ span: 24 }}
            rules={[{
              required: true,
              message: 'Пожалуйста введите свой имейл!',
              pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            labelCol={{span: 6}}
            name="password"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" className={'centered-block'} htmlType="submit" disabled={isDisabledButton}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Link href="/auth/forget-password">
            <a>Забыли пароль?</a>
        </Link>
      </div>
    </div>
  )
}
const connectedLoginPage = connect(state => state)(LoginPage)
export  default connectedLoginPage