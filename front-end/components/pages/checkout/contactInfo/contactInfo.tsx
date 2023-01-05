import React, { RefObject } from 'react'
import styles from './contactInfo.module.scss'
import { Input, Form, FormInstance, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { IUserState } from '../../../../redux/reducers/auth.reducer'
import { withTranslation } from 'next-i18next'


type Props = {
  formRef?: RefObject<FormInstance>
  auth: IUserState
  t:any
}
type State = {
  headerBanner?: string
}
export class ContactInfo extends React.Component<Props> {

  constructor(props) {
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
          {this.props.t("contactInfo.header")}
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
              <label><i className="red">*</i>{this.props.t("contactInfo.name")}</label>
              <Form.Item
                name="name"
                rules={[{ required: true, message: this.props.t("contactInfo.warn.enterName")}]}
                initialValue={`${this.props.auth.user?.username ? this.props.auth.user?.username : ''}`}

              >
                <Input className={styles.personalDataInput}/>
              </Form.Item>
            </div>
            <div className="column50">
              <label><i className="red">*</i>{this.props.t("contactInfo.lastName")}</label>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: this.props.t("contactInfo.warn.enterLastName") }]}
                initialValue={`${this.props.auth.user?.lastName ? this.props.auth.user?.lastName : ''}`}

              >
                <Input className={styles.personalDataInput} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="column50">
              <label><i className="red">*</i>{this.props.t("contactInfo.patronymic")}</label>
              <Form.Item
                name="secondName"
                rules={[{ required: true, message: this.props.t("contactInfo.warn.enterPatronymic") }]}
                initialValue={`${this.props.auth.user?.secondName ? this.props.auth.user?.secondName : ''}`}
              >
                <Input className={styles.personalDataInput} />
              </Form.Item>
            </div>
            <div className="column50">
              <label><i className="red">*</i>{this.props.t("contactInfo.phoneNumber")}</label>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: this.props.t("contactInfo.warn.enterPhoneNumber") }]}
                initialValue={`${this.props.auth.user?.phone ? this.props.auth.user?.phone : ''}`}
              >
                <Input prefix="+380" type="number" className={styles.personalDataInput} />

              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};
const connectedContactInfo =  connect(mapStateToProps)(ContactInfo);

export default withTranslation('checkout')(connectedContactInfo)

