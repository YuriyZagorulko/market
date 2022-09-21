import React, { useEffect, useState } from 'react'
import styles from "./header.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../../helpers/constants/controls'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { IState, store } from '../../../redux/store'
import { logout } from '../../../redux/actions/user'
import { OrderService } from '../../../services/order/order.service'
import { cartReducer, ICartState } from '../../../redux/reducers/cart.reducer'
import { accessSync } from 'fs'

type headerProps = {
  name?: string
  dispatch: any
}
type headerState = {
  headerBanner?: string
  searchInput?: string
}
const logoutClick = (dispatch) => () => {
  dispatch(logout())
}

function authLinks(isAuth, dispatch) {

  if (!isAuth) {
    return (
      <React.Fragment>
        <Link href="/auth/login">
          <a>Вхід</a>
        </Link>
        <Link href="/auth/sign-up">
          <a>Реєстрація</a>
        </Link>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Link href="/cabinet/orders">
          <a className={'icon-wrapper'}>Замовлення</a>
        </Link>
        <Link href="/">
          <a onClick={logoutClick(dispatch)}>Вихід</a>
        </Link>
      </React.Fragment>
    )
  }
}

function Header(props: any) {

  const { cart }: { cart: ICartState } = store.getState()
  // const [cartLength,setCartLength] = useState(0)



  const dispatch = useDispatch()
  const [state, setState] = useState({
    headerBanner: '',
    searchInput: '',
    isAuth: false,
    auth: null
  })
  useEffect(() => {
    setState({
      ...state,
      isAuth: !!(props.auth?.user)
    })
  }, [props.auth])

  useEffect(() => {
    OrderService.getOrders().then((val) => {
      console.log(val)
      // setState({
      //   orders: val.data.data
      // })
    })
  }, [])
  const router = useRouter()

  const updateInputValue = (evt) => {
    const val: string = evt.target.value
    setState({
      ...state,
      searchInput: val
    })
  }
  const redirectToSearchPage = () => {
    if (state.searchInput) {
      router.push({
        pathname: '/search',
        query: { params: JSON.stringify({ text: state.searchInput }) }
      })
    }
  }
  const handleKeyDown = (ev) => {
    if (state.searchInput) {
      if (ev.key === 'Enter') {
        redirectToSearchPage()
      }
    }
  }
  const openModal = () => {
    dispatch({ type: controlsConstants.OPEN_CART })
  }
  return (
    <div className={styles.header}>
      {state.headerBanner ? <div className={styles.headerTop}>{state.headerBanner}</div> : ''}
      <div className={`${styles.headerContent} global-width-limiter`} >
        <div className={styles.headerNavigation}>
          <div className={styles.navigationLeft}>
            <Link href="/help">
              <a>Допомога</a>
            </Link>
            <Link href="/contact-us">
              <a>Контакти</a>
            </Link>
          </div>
          <div className={styles.navigationCenter} />
          <div className={styles.navigationRight}>
            {authLinks(state.isAuth, dispatch)}
          </div>
        </div>
        <div className={styles.headerItems}>
          <div className={styles.itemsLeft}>
            <Link href="/">
              <a className={styles.logoLink}>
                <span className={styles.imgWrapper}>
                  <Image
                    src="/images/main-logo.svg"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                  />
                </span>
                <span className='link-text'>V16</span>
              </a>
            </Link>
          </div>
          <div className={styles.itemsCenter}>
            <input onChange={updateInputValue} onKeyDown={handleKeyDown} placeholder="Я шукаю..." />
            <FontAwesomeIcon icon={faSearch as IconProp} onClick={redirectToSearchPage} />
          </div>
          <div style={{ position: 'relative' }} className={styles.itemsRight + ' iconsContainer'}>
            {/* { (!state.isAuth) &&
                  <Link href="/cabinet/orders">
                    <a className={'icon-wrapper'}><FontAwesomeIcon icon={faUser as IconProp} /></a>
                  </Link>
              } */}
            <div className={styles.headerIcon + ' icon-wrapper'} onClick={openModal}>
              <div className={styles.productCount}>{props.cartLength}</div>
              <Image
                src="/images/icons/shopping-cart.svg"
                alt="Picture of the author"
                width={35}
                height={35}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



const mapStateToProps = (state: any) => {
  const cartL = state.cart?.addedProducts.reduce((acc, el) => {
    const res = acc += el.quantity
    return res
  }, 0)
  
  return {
    cartLength: cartL,
    cart:state.cart,
    auth:state.auth
  };
};
const connectedConponent = connect(mapStateToProps)(Header)
export default connectedConponent