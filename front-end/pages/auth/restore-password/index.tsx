import style from './RestorePassword.module.scss'
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Card } from 'antd'
import { connect } from 'react-redux'
import { userService } from '../../../services/user.service'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'

function RestorePassword() {
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })
  const [isSent, setIsSent] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [form] = Form.useForm()

  const router = useRouter()
  

  useEffect(() => {
    const { token } = router.query;
    if(token) {
      userService.checkRestorePasswordToken(token as string).then((res) => {
        if(res.message === 'valid') {

        } else {
          setIsValidToken(false);
        }
        setIsSent(false);
      }).catch((err) => {
        setIsValidToken(false)
      });
    }

  }, [router]);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (data: any) => {
    // setSate({ isDisabledButton: true })
    // setTimeout(() => {
    //   setSate({ isDisabledButton: false })
    // }, 4000)
    // userService.registerUser(data).then((val) => {
    //   if (val?.errors) {
    //     handleRegisterErrors(val.errors)
    //   } else {
    //     Router.push('login')
    //   }
    // })
  }
  const validateConfirmPassword = () => {
    form.validateFields(['confirmPassword'])
  }
  return (
    <>
      <Head>
        <title>Введіть новий пароль</title>
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
              label="Пароль"
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
            >
              <Input.Password
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
      </div>
    </>
  )
}

const connectedForgotPassword = connect(state => state)(RestorePassword)
export default connectedForgotPassword