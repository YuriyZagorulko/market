import React, { RefObject } from 'react'
import styles from './shipping.module.scss'
import { Input, Form, FormInstance, Row, Col, Radio, Select, } from 'antd'
import { deliveryTypes } from '../../../../helpers/order/order.constants'
import classNames from 'classnames'

const { Option } = Select
type Props = {
  formNP?: RefObject<FormInstance>
  selectedShipping: deliveryTypes
  cityOptions: { value: string, cityRef: string } []
  selectedCity: { value: string, cityRef: string, index?: number }
  officessOptions: { description: string, ref: string } []
  selectedOffice: { description: string, ref: string }
  onShippingTypeChange: (e) => void
  onCityChange: (num: number) => void
  onCitySearch: (str: string) => void
  onOfficeChange: (e) => void

}
type State = {
  headerBanner?: string
}
export default class Shipping extends React.Component<Props> {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const filterOptions = (input, option) => {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    return (
      <div className={styles.container}>
        <Form
          ref={this.props.formNP}
          name="basic"
          initialValues={{ remember: true }}
        >
          <div className={styles.deliveryType}>
            <div className="sectionTitle">
              Доставка Новою Поштою
            </div>
            <div className={styles.deliveryContainer}>
              <label>
              <i className="red">*</i>Виберіть ваше місто
              </label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Будь ласка, виберіть ваше місто' }]}
              >
                <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Виберіть місто"
                  optionFilterProp="children"
                  onChange={this.props.onCityChange}
                  onSearch={this.props.onCitySearch}
                  filterOption={filterOptions}
                >
                  {this.props.cityOptions.map((val, i) => {
                    return (<Option key={i} value={i}>{val.value}</Option>)
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <Radio.Group
            value={this.props.selectedShipping}
            className={classNames(styles.deliveryRatio, this.props.selectedCity.cityRef ? 'visible' : 'hidden')}
            onChange={this.props.onShippingTypeChange}
          >
            <div className={classNames(styles.ratio, this.props.selectedShipping === deliveryTypes.newPost ? styles.selectedShipping : '')}>
              <Radio value={deliveryTypes.newPost}>
                <div className={styles.radioTitle}>
                  Самовивіз із Нової Пошти
                </div>
              </Radio>
                <div className={styles.optionContent}>
                  <div className={styles.deliveryContainer}>
                    <label>
                      <i className="red">*</i>Виберіть відділення
                    </label>
                    <Form.Item
                      name="office"
                      rules={[{ required: this.props.selectedShipping === deliveryTypes.newPost, message: 'Будь ласка, виберіть відділення' }]}
                    >
                      <Select
                        showSearch
                        className={styles.officeSelect}
                        placeholder="Виберіть відділення"
                        optionFilterProp="children"
                        onChange={this.props.onOfficeChange}
                        filterOption={filterOptions}
                      >
                        {this.props.officessOptions.map((val, i) => {
                          return (<Option key={val.ref} value={i}>{val.description}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
            </div>
            <div className={classNames(styles.ratio, this.props.selectedShipping === deliveryTypes.newPostCourier ? styles.selectedShipping : '')}>
              <Radio value={deliveryTypes.newPostCourier}>
                <div className={styles.deliveryContainer}>
                  <div className={styles.radioTitle}>
                    Курьер Новая почта
                  </div>
                </div>
              </Radio>
              <div className={styles.optionContent}>
                <div className={styles.line}>
                    <div className={styles.lineItem}>
                      <label>
                        Улица
                      </label>
                      <Form.Item
                        name="street"
                        rules={[{ required: this.props.selectedShipping === deliveryTypes.newPostCourier, message: 'Будь ласка, вкажіть вулицю' }]}
                      >
                        <Input placeholder="Вулиця" type={'text'} />
                      </Form.Item>
                    </div>
                    <div className={styles.lineItem}>
                      <label>
                        Дом
                      </label>
                      <Form.Item
                        name="house"
                        rules={[{ required: this.props.selectedShipping === deliveryTypes.newPostCourier, message: 'Будь ласка, вкажіть будинок' }]}
                      >
                        <Input placeholder="Будинок" type={'text'} />
                      </Form.Item>
                    </div>
                    <div className={styles.lineItem}>
                      <label>
                        Квартира
                      </label>
                      <Form.Item name="apartment">
                        <Input placeholder="Квартира" type={'text'} />
                      </Form.Item>
                    </div>
                </div>
              </div>
            </div>
          </Radio.Group>
        </Form>
      </div>
    )
  }
}