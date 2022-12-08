import style from './Registration.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { userService } from '../../../services/user.service'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

function handleRegisterErrors(errors: { email: string[], phone: string[] }) {
  for (const err of errors.email) {
    if (err.includes('This field must be unique.')) {
      notification.error({
        message: 'Помилка',
        description:
          'Користувач із таким імейлом вже існує',
      })
    }
  }
  for (const err of errors.phone) {
    if (err.includes('user with this phone already exists.')) {
      notification.error({
        message: 'Помилка',
        description:
          'Користувач із таким телефоном вже існує',
      })
    }
  }
}
function RegisterPage() {
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })
  const [form] = Form.useForm()

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (data: any) => {
    setSate({ isDisabledButton: true })
    setTimeout(() => {
      setSate({ isDisabledButton: false })
    }, 4000)
    userService.registerUser(data).then((val) => {
      if (val?.errors) {
        handleRegisterErrors(val.errors)
      } else {
        Router.push('login')
      }
    })
  }
  const validateConfirmPassword = () => {
    form.validateFields(['confirmPassword'])
  }

  return (
    <>
      <Head>
        <title> V16 — Регистрация</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>
      <div className={"wrapper " + style.register}>
        <div className="text-title-xl">
          Реєстрація
        </div>
        <div className={'form-wrapper'}>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Ім'я"
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть своє ім\'я!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Прізвище"
              name="secondName"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть своє прізвище!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="По батьковi"
              name="lastName"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть своє по батькові!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Дата народження"
              name="birthday"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть своє ім\'я!' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
            >
              <Input.Password
                // tslint:disable-next-line: jsx-no-lambda
                onChange={validateConfirmPassword}
              />
            </Form.Item>

            <Form.Item
              label="Повторіть пароль"
              name="confirmPassword"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Будь ласка, введіть пароль повторно!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve()
                    return Promise.reject(new Error('Паролі не співпадають!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Iмейл"
              name="email"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Будь ласка, введіть ваш імейл!' },
                { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: 'Будь ласка, введіть ваш імейл!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="phone"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Будь ласка, введіть ваш  телефон!' },
                { pattern: /^[0-9]{9,9}$/, message: 'введене значення не є телефоном!' }
              ]}
            >
              <Input className={"no-arrows"} addonBefore="+380" maxLength={9} type="number" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className={'centered-block'}
              disabled={isDisabledButton}
            >
              Зареєструватись
            </Button>
          </Form>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link href="/auth/login">
            <a>Я вже зареєстрований</a>
          </Link>
        </div>
      </div>
    </>
  )
}
const connectedRegisterPage = connect(state => state)(RegisterPage)
export default connectedRegisterPage