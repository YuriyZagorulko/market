import style from './ForgotPassword.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Row, Card } from 'antd'
import { connect } from 'react-redux'
import { userService } from '../../../services/user.service'
import Head from 'next/head'


function ForgotPassword() {
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })
  const [isSent, setIsSent] = useState(false)
  const [form] = Form.useForm()

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (data: any) => {
    setSate({ isDisabledButton: true })
    setTimeout(() => {
      setSate({ isDisabledButton: false })
    }, 4000)
    userService.sendRestorePasswordEmail(data.email).then((val) => {
      if (val?.message) {
        setIsSent(true)
      } else {
        console.log(val)
      }
    })
  }

  return (
    <>
      <Head>
        <title> Забули пароль?</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>
      <div className={"wrapper " + style.register}>
      { !isSent && (
        <div className="text-title-xl">
          Забули пароль?
        </div>
      )}
        <div className={'form-wrapper'}>
          { isSent ? (
            <>
              <h1 style={{textAlign: 'center'}}>На вказану вами адресу відправлено емейл, якщо такий користувач був зареєстрований.</h1>
              <h1 style={{textAlign: 'center'}}>Будь ласка дотримуйтесь інструкцій вказаних в емейлі.</h1>
            </>
          ) : (
            <Card title="Вкажіть імейл, за допомогою якого ви зареєстрували свій аккаунт:">
              <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Iмейл"
                  name="email"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Будь ласка, введіть ваш імейл!' },
                    { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: 'Цей імейл не є дійсним!' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className={'centered-block'}
                  disabled={isDisabledButton}
                >
                  Відправити
                </Button>
              </Form>
            </Card>
          )}

        </div>
      </div>
    </>
  )
}

const connectedForgotPassword = connect(state => state)(ForgotPassword)
export default connectedForgotPassword