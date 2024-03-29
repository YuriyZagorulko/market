import React from 'react'
import { productConstants } from '../../helpers/constants/product.constants'
import styles from './Checkout.module.scss'
import { connect } from 'react-redux'
import { store } from '../../redux/store'
import { IProduct } from '../../helpers/types/responces/products'
import { Unsubscribe } from 'redux-saga'
import { AutoComplete, Button, FormInstance, Input, Radio, Select } from 'antd'
import { getTotalPrice } from '../../redux/reducers/cart.reducer'
import classnames from 'classnames'
import ProductListItem from '../../components/shared/product/productListItem/productListItem'
import Router from 'next/router'
import { ICitiesResponce, NPapiService } from '../../services/order/NPapi.service'
import { deliveryTypes } from '../../helpers/order/order.constants'
import ContactInfo from '../../components/pages/checkout/contactInfo/contactInfo'
import Shipping from '../../components/pages/checkout/shipping/shipping'
import { INewPostData } from '../../helpers/types/shipping'
import { IOrderData, OrderService } from '../../services/order/order.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../helpers/constants/controls'
import CustomBtn from '../../components/shared/customBtn/customBtn'
import { clearCart } from '../../redux/actions/cart'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface IProps {
  dispatch: any,
}
interface IState {
  products: { product: IProduct, quantity: number } []
  storeUnsub: Unsubscribe
  totalPrice: number
  name: string
  surname: string
  selectedShipping: deliveryTypes
  cityOptions: { value: string, cityRef: string } []
  selectedCity: { value: string, cityRef: string }
  officessOptions: { description: string, ref: string } []
  selectedOffice: { description: string, ref: string }
}
class CheckoutPage extends React.Component<IProps, IState> {
  contactFormRef = React.createRef<FormInstance>()
  shippingNPFormRef = React.createRef<FormInstance>()
  constructor(props: any){
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
      officessOptions: [],
    }
  }
  componentWillUnmount(){
    if (this.state.storeUnsub){
      this.state.storeUnsub()
    }
  }
  componentDidMount() {
    const updateState = () => {
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
    }
    updateState()
    const unsub = store.subscribe(updateState)
    this.setState({
      storeUnsub: unsub
    })
    this.citySearch('д')
  }
  citySearch = (str: string) => {
    NPapiService.getCities(str).then((data: ICitiesResponce) => {
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
  checkoutOrder = async () => {
      this.contactFormRef.current!.submit()
      this.shippingNPFormRef.current!.submit()
      this.contactFormRef.current!.validateFields().then((contactVal: any) => {
        this.shippingNPFormRef.current!.validateFields().then((shippingVal: any) => {

          const productIds = []
          for (const pr of this.state.products){
            productIds.push({ id: pr.product.id, quantity: pr.quantity})
          }
          const orderData: IOrderData = {
            name: contactVal.name,
            surname: contactVal.surname,
            secondName: contactVal.secondName,
            phone: contactVal.phone,
            productList: productIds,
            shipping: {
              type: deliveryTypes.newPost,
              data: {
                selectedCity: this.state.selectedCity,
                selectedOffice: this.state.selectedOffice
              }
            }
          }
          OrderService.confirmOrder(orderData).then((val: { data }) => {
            debugger
            if (val.data === "success"){
              this.props.dispatch(clearCart())
              Router.push("/checkout/success")
            } else {
              console.log(val)
            }
          })
        })
        .catch((e) => {
          console.log(e)
        })
      }).catch((e) => {
        console.log(e)
      })
      console.log(this.shippingNPFormRef.current.getFieldsValue())
  }

  openModal = () => {
    this.props.dispatch({type: controlsConstants.OPEN_CART})
  }
  productsList = () => {
    if (this.state.products.length > 0) {
        return (
          <div className={styles.productListWrapper}>
            <div className={styles.listHead}>
              <div className="sectionTitle">
                Список товаров
              </div>
              <a href="#" className={styles.editList + ' link-blue'} onClick={this.openModal}>
                <div>
                  <FontAwesomeIcon height="12px" icon={faEdit as IconProp} />
                </div>
                Редактировать
              </a>
            </div>
            <div className={styles.productList}>
            {this.state.products.map((item, i) => {
              return (
                <ProductListItem
                  key={item.product.id}
                  product={ item }
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
        <div className="row">
          <label>
            {this.state.products.length} товаров на сумму
          </label>
          <div className={styles.sum}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <div className="row">
          <label>
            Стоимость доставки
          </label>
          <div className={styles.alignRight}>
            по тарифам перевозчика
          </div>
        </div>
        <div className={classnames('row', styles.withBorders)}>
          <label>
            К оплате
          </label>
          <div className={classnames(styles.alignRight, styles.totalPrice)}>
            ₴ {this.state.totalPrice}
          </div>
        </div>
        <CustomBtn
          key="submit"
          type="primary"
          className={styles.checkoutOrder}
          onClick={this.checkoutOrder}
        >
          Подтверждаю заказ
        </CustomBtn>
      </div>
    )
  }
  shippingSetup(){
    const onShippingChange = e => {
      console.log(e)
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
    const officeSelect = (e) => {
      const office = this.state.officessOptions[e]
      if (office){
        this.setState({
          selectedOffice: office
        })
      }
      console.log(office)
    }
    return(
      <Shipping
        cityOptions={this.state.cityOptions}
        selectedCity={this.state.selectedCity}
        officessOptions={this.state.officessOptions}
        onCityChange={citySelect}
        onCitySearch={this.citySearch}
        formNP={this.shippingNPFormRef}
        selectedShipping={this.state.selectedShipping}
        selectedOffice={this.state.selectedOffice}
        onShippingTypeChange={onShippingChange}
        onOfficeChange={officeSelect}
      />
    )
  }
  render () {
    return (
      <div className={styles.container + ' global-width-limiter'}>
        <div className={styles.content}>
          <h1>Оформление заказа</h1>
          <ContactInfo formRef={this.contactFormRef}/>
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