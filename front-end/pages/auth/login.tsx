import style from '../../styles/pages/Login.module.scss'
import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
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

    Demo = () => {
        const onFinish = (values: any) => {
            console.log('Success:', values)
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
              Войти
            </div>
            <div className="">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Имейл"
                  labelCol={{span: 6}}
                  name="имейл"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свой имейл!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  labelCol={{span: 6}}
                  name="пароль"
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
                >
                  <Input.Password />
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