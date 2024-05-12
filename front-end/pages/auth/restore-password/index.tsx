import style from './RestorePassword.module.scss'
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Card } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { userService } from '../../../services/user.service'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { openNotificationWithIcon } from '../../../helpers/notifications'
import { controlActions } from '../../../redux/actions/controls'

function RestorePassword() {
  const dispatch = useDispatch()
  const [{ isDisabledButton }, setSate] = useState({
    isDisabledButton: false
  })
  const [isSent, setIsSent] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [restoreToken, setRestoreToken] = useState<string>('')
  const [form] = Form.useForm()

  const router = useRouter()
  

  useEffect(() => {
    dispatch(controlActions.startLoader())
    const { token } = router.query;
    if(token) {
      setRestoreToken(token as string)
      dispatch(controlActions.stopLoader())
      userService.checkRestorePasswordToken(token as string).then((res) => {
        if(res.message === 'valid') {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
        setIsSent(false);
      }).catch((err) => {
        dispatch(controlActions.stopLoader())
        setIsValidToken(false)
      });
    }

  }, [router]);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = (data: any) => {
    setSate({ isDisabledButton: true })
    userService.changePassword(data.password, restoreToken).then((val) => {
      if (val?.error) {
        // handleRegisterErrors(val.errors)
      } else {
        openNotificationWithIcon('success', 'Success', 'Пароль було змінено')
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
        <title>Відновлення паролю</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content=''></meta>
        <meta name="keywords" content=''></meta>
      </Head>
    { isValidToken ? (
      <>
      <div className={"wrapper " + style.register}>
        <div className="text-title-xl">
          Введіть новий пароль
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
              Змінити Пароль
            </Button>
          </Form>
        </div>
      </div>
    </>
    ) : (
      <div className="text-title-xl" style={{paddingTop: '30px'}}>
        Це посилання не є вірним.
      </div>
    )}
    </>
  )
}

const connectedForgotPassword = connect(state => state)(RestorePassword)
export default connectedForgotPassword