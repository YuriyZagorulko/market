import style from '../../styles/pages/Registration.module.scss'
import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker, Row, Col, Space } from 'antd'
import { connect } from 'react-redux'
import { userActions } from '../../redux/actions/user'
import { userService } from '../../services/user.service'


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}

const onFinish = (data: any) => {
    console.log('Finish', data)
    userService.registerUser(data).then((val) => {
      console.log(val)
    })
}
function RegisterPage (){

        const [form] = Form.useForm()

        return (
          <div className={"wrapper " + style.register}>
            <div className="text-title-xl">
              Регистрация
            </div>
            <div className={'form-wrapper'}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Имя"
                  name="name"
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
                  name="birthdate"
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
                  <Input.Password />
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

                  <Button type="primary" htmlType="submit" style={{marginLeft: '128px'}}>
                    Зарегистрироваться
                  </Button>
              </Form>
            </div>
          </div>
        )
}
const connectedRegisterPage = connect(state => state)(RegisterPage)
export  default connectedRegisterPage