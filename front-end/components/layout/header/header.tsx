import React, { useState } from 'react'
import styles from "./header.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../../helpers/constants/controls'
import { connect, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

type headerProps = {
  name?: string
  dispatch: any
}
type headerState = {
  headerBanner?: string
  searchInput?: string
}

function Header (){
    const dispatch = useDispatch()
    const [state, setSate] = useState({
      headerBanner: '',
      searchInput: ''
    })
    const router = useRouter()
    const updateInputValue = (evt) => {
      const val: string = evt.target.value
      setSate({
        ...state,
        searchInput: val
      })
    }
    const redirectToSearchPage = () => {
      if (state.searchInput) {
        router.push({
            pathname: '/search',
            query: { text: state.searchInput }
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
              <Link href="/auth/login">
                <a>Войти</a>
              </Link>
              или
              <Link href="/auth/sign-up">
                <a>зарегистрироваться</a>
              </Link>
            </div>
          </div>
          <div className={styles.headerItems}>
            <div className={styles.itemsLeft}>
              <Link href="/">
                <a className={styles.logoLink}>
                  <Image
                      src="/images/main-logo.svg"
                      alt="Picture of the author"
                      width={60}
                      height={60}
                    />
                    <span className='link-text'>V16</span>
                </a>
              </Link>
            </div>
            <div className={styles.itemsCenter}>
              <input  onChange={updateInputValue} onKeyDown={handleKeyDown} placeholder="Я ищу..."/>
              <FontAwesomeIcon icon={faSearch} onClick={redirectToSearchPage} />
            </div>
            <div className={styles.itemsRight}>
              <div className={styles.headerIcon} onClick={openModal}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

const connectedConponent = connect(state => state)(Header)
export default connectedConponent