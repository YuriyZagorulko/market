import style from './Registration.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, notification, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { userService } from '../../../services/user.service'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n, useTranslation } from 'next-i18next'

function handleRegisterErrors(errors: { email: string[], phone: string[] }) {
  for (const err of errors.email) {
    if (err.includes('This field must be unique.')) {
      notification.error({
        message: i18n.t('error',{ ns : 'auth'}),
        description:
        i18n.t('err.emailAlreadyTaken',{ ns : 'auth'}),
      })
    }
  }
  for (const err of errors.phone) {
    if (err.includes('user with this phone already exists.')) {
      notification.error({
        message: i18n.t('error',{ ns : 'auth'}),
        description:
          i18n.t('err.phoneAlreadyTaken',{ ns : 'auth'}),
      })
    }
  }
}
function RegisterPage() {
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })
  const [form] = Form.useForm()
  const { t : trans } = useTranslation('auth')


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
          {trans("registration")}
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
              label={trans("name")}
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans("warn.enterName") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={trans("lastName")}
              name="secondName"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans("warn.enterLastName") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={trans("patronymic")}
              name="lastName"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans("warn.enterPatronymic") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={trans("birthDate")}
              name="birthday"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans("warn.enterBirthDate") }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label={trans("password")}
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans("warn.enterPassword") }]}
            >
              <Input.Password
                // tslint:disable-next-line: jsx-no-lambda
                onChange={validateConfirmPassword}
              />
            </Form.Item>

            <Form.Item
              label={trans("repeatPassword")}
              name="confirmPassword"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: trans("warn.reenterPassword") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve()
                    return Promise.reject(new Error(trans("err.passwordsDoesNotMatch")))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label={trans("email")}
              name="email"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: trans("warn.enterEmail") },
                { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: trans('warn.enterEmail') }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={trans("phone")}
              name="phone"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: trans("warn.enterPhone") },
                { pattern: /^[0-9]{9,9}$/, message: trans("err.numberEnteredIncorrectly") }
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
              {trans("register")}
            </Button>
          </Form>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link href="/auth/login">
            <a>{trans("alreadyRegistered")}</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  return {
  props: await serverSideTranslations(locale, ['auth','layout','sharedUI']),
  }
}

const connectedRegisterPage = connect(state => state)(RegisterPage)
export default connectedRegisterPage