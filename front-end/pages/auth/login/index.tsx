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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n, useTranslation } from 'next-i18next'

interface IProps {
  login: any
  dispatch: any
}
function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t : trans } = useTranslation('auth')
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
          message: i18n.t('error', {ns:'auth'}),
          description:
          i18n.t('err.emailAlreadyTaken', {ns:'auth'}),
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
          {trans("signIn")}
        </div>
        <div className="">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinishFailed={onFinishFailed}
            ref={formRef}
          >
            <Form.Item
              label={trans("email")}
              labelCol={{ span: 6 }}
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{
                required: true,
                message: trans("warn.enterEmail"),
                pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={trans("password")}
              labelCol={{ span: 6 }}
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: trans('warn.enterPassword') }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <CustomBtn type="primary" className={'centered-block'} htmlType="submit" onClick={onFinish}>
                {trans("enter")}
              </CustomBtn>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Link href="/auth/forget-password">
            <a>{trans("forgotPassword")}</a>
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

const connectedLoginPage = connect(state => state)(LoginPage)
export default connectedLoginPage