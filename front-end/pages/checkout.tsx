import React from 'react'
import { productConstants } from '../helpers/constants/product.constants'
import styles from '../styles/pages/Checkout.module.scss'
import { connect } from 'react-redux'
import { store } from '../redux/store'
import { IProduct } from '../helpers/types/responces/products'
import { Unsubscribe } from 'redux-saga'
import { AutoComplete, Button, Input, Radio, Select } from 'antd'
import { getTotalPrice } from '../redux/reducers/cart.reducer'
import classnames from 'classnames'
import ProductListItem from '../components/shared/product/productListItem/productListItem'
import Router from 'next/router'
import { ICitiesResponce, NPapiService } from '../services/order/NPapi.service'
import { deliveryTypes } from '../helpers/order/order.constants'

const { Option } = Select
interface IProps {
  login: any
  dispatch: any
}
interface IState {
  products: { product: IProduct, quantity: number } []
  storeUnsub: Unsubscribe
  totalPrice: number
  name: string
  surname: string
  selectedShipping: string
  cityOptions: { value: string, cityRef: string } []
  selectedCity: { value: string, cityRef: string }
  officessOptions: { description: string, ref: string } []
  selectedOffice: { description: string, ref: string }
}
class CheckoutPage extends React.Component<IProps, IState> {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      surname: '',
      products: [],
      storeUnsub: null,
      totalPrice: 0,
      selectedShipping: deliveryTypes.newPost,
      cityOptions: [],
      selectedCity: { cityRef: '', value: '' },
      selectedOffice: { description: '', ref: '' },
      officessOptions: []
    }
  }
  componentWillUnmount(){
    if (this.state.storeUnsub){
      this.state.storeUnsub()
    }
  }
  componentDidMount() {
    const unsub = store.subscribe(() => {
      const cartState  = store.getState().cart
      if (cartState && cartState.addedProducts){
        if (cartState.addedProducts.length <= 0){
          Router.push('/')
        }
        this.setState({
          products: cartState.addedProducts,
          totalPrice: getTotalPrice(cartState)
        })
      }
    })
    this.setState({
      storeUnsub: unsub
    })
    const { dispatch } = this.props
    dispatch({ type: productConstants.GETMAIN_REQUEST })
    this.citySearch('д')
  }
  citySearch = (str: string) => {
    console.log(str)
    NPapiService.getCities(str).then((data: ICitiesResponce) => {
      console.log('cities recived: ')
      console.log(data)
      const cities: { value: string, cityRef: string }[] = []
      if (data && data.Addresses) {
      for (const c of data.Addresses){
        cities.push({
          value: c.MainDescription,
          cityRef: c.DeliveryCity,
        })
        this.setState({
          cityOptions: cities
        })
      }
    }
    })
  }
  checkoutOrder = () => {
      
  }
  contactInfo(){
    return (
      <div className={styles.contactInfo}>
        <div className={styles.sectionTitle}>
          Контактные данные получателя заказа
        </div>
        <div className={styles.row}>
          <div className={styles.colum50}>
            <label>Фамилия</label>
            <Input className={styles.input} type="text"/>
          </div>
          <div className={styles.colum50}>
            <label>Имя</label>
            <Input className={styles.input} maxLength={1} type="text"/>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.colum50}>
            <label>Телефон</label>
            <Input className={styles.input} prefix="+380" type="number"/>
          </div>
          <div className={styles.colum50}>
            <label>Отчество</label>
            <Input className={styles.input} type="text"/>
          </div>
        </div>
      </div>
    )
  }
  productsList = () => {
    if (this.state.products.length > 0) {
        return (
          <div className={styles.productListWrapper}>
            <div className={styles.sectionTitle}>
              Список товаров
            </div>
            <div className={styles.productList}>
            {this.state.products.map((item, i) => {
              return (
                // <CartProduct
                //   key={item.product.id}
                //   addedProduct={item}
                //   onDelete={this.removeProduct}
                //   onQuantityChange={this.quantityChange}
                // />
                <ProductListItem
                  key={item.product.id}
                  product={ item.product}
                />
              )
            })}
          </div>
          </div>
        )
      } else {
        return <div>Nothing In he cart yet</div>
      }
  }
  sidebar() {
    return (
      <div className={styles.sidebarTotal + ' box-gray'}>
        <h1>Итого</h1>
        <div className={styles.row}>
          <label>
            {this.state.products.length} товаров на сумму
          </label>
          <div className={styles.sum}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <div className={styles.row}>
          <label>
            Стоимость доставки
          </label>
          <div className={styles.alignRight}>
            по тарифам перевозчика
          </div>
        </div>
        <div className={classnames(styles.row, styles.withBorders)}>
          <label>
            К оплате
          </label>
          <div className={classnames(styles.alignRight, styles.totalPrice)}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <Button
          key="submit"
          type="primary"
          className={styles.checkoutOrder}
          onClick={this.checkoutOrder}
        >
          Подтверждаю заказ
        </Button>
      </div>
    )
  }
  shippingSetup(){
    const onChange = e => {
      this.setState({selectedShipping: e.target.value})
    }
    const citySelect = (e: number) => {
      const city = this.state.cityOptions[e]
      if (city){
        this.setState({
          selectedCity: city
        })
        NPapiService.getOfficess(city.cityRef).then((data) => {
          this.setState({
            officessOptions: data
          })
        })
      }
      console.log(city)
    }
    const filterOptions = (input, option) => {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    const officeSelect = (e) => {
      const office = this.state.officessOptions[e]
      console.log(office)
    }
    return(
      <div className={styles.shippingContainer}>
        <div className={styles.sectionTitle}>
          Доставка новой почтой
        </div>
        <div className={styles.deliveryContainer}>
          <label>
            Выберите ваш город
          </label>
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Выберите город"
            optionFilterProp="children"
            onChange={citySelect}
            onSearch={this.citySearch}
            filterOption={filterOptions}
          >
            {this.state.cityOptions.map((val, i) => {
              return (<Option key={i} value={i}>{val.value}</Option>)
            })}
          </Select>
        </div>
        {this.state.selectedCity.cityRef ?
          (
            <div className={styles.deliveryContainer}>
              <label>
                Выберите ваш город
              </label>
              <Select
                showSearch
                className={styles.officeSelect}
                placeholder="Выберите Отделение"
                optionFilterProp="children"
                onChange={officeSelect}
                filterOption={filterOptions}
              >
                {this.state.officessOptions.map((val, i) => {
                  return (<Option key={val.ref} value={i}>{val.description}</Option>)
                })}
              </Select>
            </div>
          ) : ''
        }
        {/* <Radio.Group value={this.state.selectedShipping} onChange={onChange}>
          <div className={
            classnames(
              (this.state.selectedShipping === deliveryTypes.newPost ? styles.selectedShipping : ''),
              styles.shippingOption
            )
          }>
            <Radio value={deliveryTypes.newPost}>NP</Radio>
            <div className={styles.deliveryContainer}>
              <label>
                Выберите ваш город
              </label>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={citySelect}
                onSearch={this.citySearch}
                filterOption={filterCities}
              >
                {this.state.cityOptions.map((val) => {
                  return (<Option key={val.value} value={val.value}>{val.value}</Option>)
                })}
              </Select>
            </div>
          </div>
          <Radio value={deliveryTypes.justin}>Justin</Radio>
        </Radio.Group> */}
      </div>
    )
  }
  render () {
    return (
      <div className={styles.container + ' global-width-limiter'}>
        <div className={styles.content}>
          <h1>Оформление заказа</h1>
          {this.contactInfo()}
          {this.productsList()}
          {this.shippingSetup()}
        </div>
        <div className={styles.sidebar}>
          {this.sidebar()}
        </div>
      </div>
    )
  }
}
const connectedCheckoutPage = connect(state => state)(CheckoutPage)
export  default connectedCheckoutPage