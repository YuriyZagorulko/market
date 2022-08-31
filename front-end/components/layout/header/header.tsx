import React, { useState } from 'react'
import styles from "./header.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../../helpers/constants/controls'
import { connect, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { store } from '../../../redux/store'

type headerProps = {
  name?: string
  dispatch: any
}
type headerState = {
  headerBanner?: string
  searchInput?: string
}

function authLinks (isAuth) {
  if (isAuth) {
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
    <Link href="/cabinet/orders">
      <a className={'icon-wrapper'}>Мої замовлення</a>
    </Link>
    )
  }
}
function Header (){
    const dispatch = useDispatch()
    const [state, setState] = useState({
      headerBanner: '',
      searchInput: '',
      isAuth: false
    })
    store.subscribe(() => {
      setState({
        ...state,
        isAuth: !!store.getState().auth.user
      })
    })
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
            query: {params: JSON.stringify({ text: state.searchInput })}
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
      dispatch({type: controlsConstants.OPEN_CART})
    }
    return (
      <div className={styles.header}>
        { state.headerBanner ? <div className={styles.headerTop}>{state.headerBanner}</div> : ''}
        <div className={`${styles.headerContent} global-width-limiter`} >
          <div className={styles.headerNavigation}>
            <div className={styles.navigationLeft}>
              <Link href="/help">
                <a>Помощь</a>
              </Link>
              <Link href="/contact-us">
                <a>Контакты</a>
              </Link>
            </div>
            <div className={styles.navigationCenter}/>
            <div className={styles.navigationRight}>
              {authLinks(state.isAuth)}
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
              <input  onChange={updateInputValue} onKeyDown={handleKeyDown} placeholder="Я ищу..."/>
              <FontAwesomeIcon icon={faSearch as IconProp} onClick={redirectToSearchPage} />
            </div>
            <div className={styles.itemsRight + ' iconsContainer'}>
              { (!state.isAuth) &&
                  <Link href="/cabinet/orders">
                    <a className={'icon-wrapper'}><FontAwesomeIcon icon={faUser as IconProp} /></a>
                  </Link>
              }
              <div className={styles.headerIcon + ' icon-wrapper'} onClick={openModal}>
                <FontAwesomeIcon icon={faShoppingCart as IconProp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

const connectedConponent = connect(state => state)(Header)
export default connectedConponent