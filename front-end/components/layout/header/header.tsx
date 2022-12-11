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


function authLinks(isAuth, dispatch) {
  const openExitDialogWindow = () => {
    dispatch({ type: controlsConstants.OPEN_EXIT_DIALOG })
  }

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
          <a onClick={openExitDialogWindow}>Вихід</a>
      </React.Fragment>
    )
  }
}

function Header(props: any) {
  const { cart }: { cart: ICartState } = store.getState()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    headerBanner: '',
    searchInput: '',
  })
  
  const [isRenderAuthLinks, setIsRenderAuthLinks] = useState(true)
  const [isShowCartLength,setIsShowCartLength] = useState(false)

  useEffect(() => {
    setIsRenderAuthLinks(!!props.user)
  }, [props.user])
  useEffect(() => {
    setIsShowCartLength(!!props.cartL)
  }, [props.cartL])

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
    <header className={styles.header}>
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
            {authLinks(isRenderAuthLinks, dispatch)}
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
          <div style={{ position: 'relative' ,padding: '10px' }} className={styles.itemsRight + ' iconsContainer'}>
            <div className={styles.headerIcon + ' icon-wrapper'} onClick={openModal}>
              {isShowCartLength && <div className={styles.productCount}>{props.cartL}</div> }
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
    </header>
  )
}



const mapStateToProps = (state: IState) => {
  let cartL = 0
  cartL = state?.cart?.addedProducts.reduce((acc :number, el : {quantity : number}) => {
    const res = acc += el.quantity
    return res
  }, 0)

  return {
    cartL: cartL,
    cart:state.cart,
    user:state.auth.user
  };
};
const connectedConponent = connect(mapStateToProps)(Header)
export default connectedConponent