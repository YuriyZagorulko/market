import style from './Registration.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification, DatePicker, Row, Col, Space } from 'antd'
import { connect } from 'react-redux'
import { userService } from '../../../services/user.service'
import Router , {useRouter}  from 'next/router'
import Link from 'next/link'

function handleRegisterErrors(errors: { email: string[], phone: string[]}) {
  for (const err of errors.email) {
    if (err.includes('This field must be unique.')) {
      notification.error({
        message: 'Ошибка',
        description:
          'Пользователь с таким имейлом уже существует',
      })
    }
  }
  for (const err of errors.phone) {
    if (err.includes('user with this phone already exists.')) {
      notification.error({
        message: 'Ошибка',
        description:
          'Пользователь с таким телефоном уже существует',
      })
    }
  }
}
function RegisterPage () {
        const [{isDisabledButton}, setSate] = useState({
          isDisabledButton: false
        })
        const [form] = Form.useForm()

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo)
        }

        const onFinish = (data: any) => {
            setSate({isDisabledButton: true})
            setTimeout(() => {
              setSate({isDisabledButton: false})
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
          <div className={"wrapper " + style.register}>
            <div className="text-title-xl">
              Регистрация
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
                  label="Имя"
                  name="username"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое имя!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Фамилия"
                  name="secondName"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свою Фамилию!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Отчество"
                  name="lastName"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое отчество!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Дата Рождения"
                  name="birthday"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое имя!' }]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
                >
                  <Input.Password
                    // tslint:disable-next-line: jsx-no-lambda
                    onChange={validateConfirmPassword}
                  />
                </Form.Item>

                <Form.Item
                  label="Повтоите пароль"
                  name="confirmPassword"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Пожалуйста введите пароль повторно!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) return Promise.resolve()
                        return Promise.reject(new Error('Пароли не совпадают!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Имейл"
                  name="email"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Пожалуйста введите ваш имейл!' },
                    { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: 'Пожалуйста введите ваш имейл!' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Телефон"
                  name="phone"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Пожалуйста введите ваш  телефон!' },
                    { pattern: /^[0-9]{9,9}$/, message: 'введенное значение не является телефоном!' }
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
                    Зарегистрироваться
                  </Button>
              </Form>
            </div>
            <div style={{marginTop: '30px'}}>
              <Link href="/auth/login">
                  <a>Я уже зарегистрирован</a>
              </Link>
            </div>
          </div>
        )
}
const connectedRegisterPage = connect(state => state)(RegisterPage)
export  default connectedRegisterPage