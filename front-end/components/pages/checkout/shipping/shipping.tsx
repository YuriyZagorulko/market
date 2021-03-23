import React, { RefObject } from 'react'
import styles from './shipping.module.scss'
import { Input, Form, FormInstance, Row, Col, Radio, Select, } from 'antd'
import { deliveryTypes } from '../../../../helpers/order/order.constants'
import classNames from 'classnames'

const { Option } = Select
type Props = {
  formNP?: RefObject<FormInstance>
  selectedShipping: string
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
        <Radio.Group value={this.props.selectedShipping} className={styles.deliveryRatio} onChange={this.props.onShippingTypeChange}>
          <div className={classNames(styles.ratio, this.props.selectedShipping === deliveryTypes.newPost ? styles.selectedShipping : '')}>
            <Radio value={deliveryTypes.newPost}>
              <div className={styles.radioTitle}>
                Самовывоз из новой почты
              </div>
            </Radio>
              <div className={styles.optionContent}>
                <div className={styles.deliveryContainer}>
                  <label>
                  <i className="red">*</i>Выберите ваш город
                  </label>
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Выберите город"
                    optionFilterProp="children"
                    onChange={this.props.onCityChange}
                    onSearch={this.props.onCitySearch}
                    filterOption={filterOptions}
                  >
                    {this.props.cityOptions.map((val, i) => {
                      return (<Option key={i} value={i}>{val.value}</Option>)
                    })}
                  </Select>
                </div>
                <div className={classNames(styles.deliveryContainer, this.props.selectedCity.cityRef ? 'visible' : 'hidden')}>
                  <label>
                    <i className="red">*</i>Выберите отделение
                  </label>
                  <Select
                    showSearch
                    className={styles.officeSelect}
                    placeholder="Выберите Отделение"
                    optionFilterProp="children"
                    onChange={this.props.onOfficeChange}
                    filterOption={filterOptions}
                  >
                    {this.props.officessOptions.map((val, i) => {
                      return (<Option key={val.ref} value={i}>{val.description}</Option>)
                    })}
                  </Select>
                </div>
              </div>
          </div>
          <div className={classNames(styles.ratio, this.props.selectedShipping === deliveryTypes.justin ? styles.selectedShipping : '')}>
            <Radio value={deliveryTypes.justin}>
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
                    <Input placeholder="Улица" type={'text'} />
                  </div>
                  <div className={styles.lineItem}>
                    <label>
                      Дом
                    </label>
                    <Input placeholder="Дом" type={'text'} />
                  </div>
                  <div className={styles.lineItem}>
                    <label>
                      Квартира
                    </label>
                    <Input placeholder="Квартира" type={'text'} />
                  </div>
              </div>
            </div>
          </div>
        </Radio.Group>
      </div>
      )
    }
  }