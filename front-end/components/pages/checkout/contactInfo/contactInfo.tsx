import React, { RefObject } from 'react'
import styles from './contactInfo.module.scss'
import { Input, Form, FormInstance, Row, Col } from 'antd'

type Props = {
  formRef?: RefObject<FormInstance>
}
type State = {
  headerBanner?: string
}
export default class ContactInfo extends React.Component<Props> {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      const onFinish = (values: any) => {
        console.log('Success:', values)
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }

      return (
        <div className={styles.contactInfo}>
          <div className="sectionTitle">
            Контактные данные получателя заказа
          </div>
          <Form
          name="basic"
          ref={this.props.formRef}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="column50">
              <label><i className="red">*</i>Имя</label>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
              >
                <Input style={{width: 300}} />
              </Form.Item>
              </div>
            <div className="column50">
              <label><i className="red">*</i>Фамилия</label>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: 'Пожалуйста введите фамилию!' }]}
              >
                <Input style={{width: 300}}/>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="column50">
              <label><i className="red">*</i>Отчество</label>
              <Form.Item
                name="secondName"
                rules={[{ required: true, message: 'Пожалуйста введите отчество!' }]}
              >
                <Input style={{width: 300}}/>
              </Form.Item>
            </div>
            <div className="column50">
              <label><i className="red">*</i>Номер телефона</label>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: 'Пожалуйста введите номер телефона!' }]}
              >
                <Input prefix="+380" type="number" style={{width: 300}}/>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}