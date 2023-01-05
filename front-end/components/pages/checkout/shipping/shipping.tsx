import React, { RefObject } from 'react'
import styles from './shipping.module.scss'
import { Input, Form, FormInstance, Row, Col, Radio, Select, } from 'antd'
import { deliveryTypes } from '../../../../helpers/order/order.constants'
import classNames from 'classnames'
import { withTranslation } from 'next-i18next'

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
  t: (string:string)=>string

}
type State = {
  headerBanner?: string
}
class Shipping extends React.Component<Props> {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const filterOptions = (input, option) => {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    console.log(this.props.officessOptions)
    return (
      <div className={styles.container}>
        <Form
          ref={this.props.formNP}
          name="basic"
          initialValues={{ remember: true }}
        >
          <div className={styles.deliveryType}>
            <div className="sectionTitle">
              {this.props.t('shipping.postDelivery')}
            </div>
            <div className={styles.deliveryContainer}>
              <label>
              <i className="red">*</i>{this.props.t('shipping.chooseCity')}
              </label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: this.props.t('shipping.warn.chooseCity') }]}
              >
                <Select
                  showSearch
                  className={styles.citySelect}
                  placeholder={this.props.t('shipping.chooseCity')}
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
                  {this.props.t('shipping.pickupFromPostOffice')}
                </div>
              </Radio>
                <div className={styles.optionContent}>
                  <div className={styles.deliveryContainer}>
                    <label>
                      <i className="red">*</i>{this.props.t('shipping.warn.chooseDepartament')}
                    </label>
                    <Form.Item
                      name="office"
                      rules={[{ required: this.props.selectedShipping === deliveryTypes.newPost, message: this.props.t('shipping.warn.chooseDepartament') }]}
                    >
                      <Select
                        showSearch
                        className={styles.officeSelect}
                        placeholder={this.props.t('shipping.warn.chooseDepartament')}
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
                   {this.props.t('shipping.courierDelivery')} 
                  </div>
                </div>
              </Radio>
              <div className={styles.optionContent}>
                <div className={styles.line}>
                    <div className={styles.lineItem}>
                      <label>
                        {this.props.t('shipping.street')}
                      </label>
                      <Form.Item
                        name="street"
                        rules={[{ required: this.props.selectedShipping === deliveryTypes.newPostCourier, message: this.props.t('shipping.warn.enterStreet') }]}
                      >
                        <Input placeholder={this.props.t('shipping.street')} type={'text'} />
                      </Form.Item>
                    </div>
                    <div className={styles.lineItem}>
                      <label>
                        {this.props.t("shipping.house")}
                      </label>
                      <Form.Item
                        name="house"
                        rules={[{ required: this.props.selectedShipping === deliveryTypes.newPostCourier, message:  this.props.t("shipping.warn.enterHouse") }]}
                      >
                        <Input placeholder={this.props.t("shipping.house")} type={'text'} />
                      </Form.Item>
                    </div>
                    <div className={styles.lineItem}>
                      <label>
                      {this.props.t("shipping.apartament")}
                      </label>
                      <Form.Item name="apartment">
                        <Input placeholder={this.props.t("shipping.apartament")} type={'text'} />
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

export default withTranslation('checkout')(Shipping)