import style from '../../styles/pages/Registration.module.scss'
import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { userActions } from '../../redux/actions/user'

interface IProps {
    login: any
    dispatch: any
}
interface IState {
    username: string,
    password: string,
    submitted: boolean
}
class LoginPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    onFinish = (data: any) => {
        console.log('Finish', data)
    }

    render() {
        return (
          <div className={"wrapper " + style.login}>
            <div className="text-title-xl">
              Регистрация
            </div>
            <div className={'form-wrapper'}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Имя"
                  name="имя"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое имя!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Фамилия"
                  name="фамилия"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свою Фамилию!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Отчество"
                  name="отчество"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое отчество!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Дата Рождения"
                  name="дата рождения"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свое имя!' }]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="пароль"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Имейл"
                  name="email"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: 'Пожалуйста введите ваш имейл!' },
                    { pattern: '', message: 'Пожалуйста введите ваш имейл!' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit">
                    Войти
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )
    }
}
const connectedLoginPage = connect(state => state)(LoginPage)
export  default connectedLoginPage