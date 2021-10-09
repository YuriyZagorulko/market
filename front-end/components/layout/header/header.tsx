import React from 'react'
import styles from "./header.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../../helpers/constants/controls'
import { connect } from 'react-redux'

type headerProps = {
  name?: string
  dispatch: any
}
type headerState = {
  headerBanner?: string
}
class Header extends React.Component<headerProps, headerState> {
    constructor(props){
      super(props)
      this.state = {
        headerBanner: ''
      }
    }
    openModal = () => {
      this.props.dispatch({type: controlsConstants.OPEN_CART})
    }
    render() {
      return (
      <div className={styles.header}>
        { this.state.headerBanner ? <div className={styles.headerTop}>{this.state.headerBanner}</div> : ''}
        <div className={`${styles.headerContent} global-width-limiter`} >
          <div className={styles.headerNavigation}>
            <div className={styles.navigationLeft}>
              <Link href="/help">
                <a>Помощь</a>
              </Link>
              <Link href="/contacts">
                <a>Контакты</a>
              </Link>
            </div>
            <div className={styles.navigationCenter}/>
            <div className={styles.navigationRight}>
              <Link href="/auth/sign-in">
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
                <a>
                  <Image
                      src="/images/vercel.svg"
                      alt="Picture of the author"
                      width={283}
                      height={64}
                    />
                </a>
              </Link>
            </div>
            <div className={styles.itemsCenter}>
              <input placeholder="Я ищу..."/>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className={styles.itemsRight}>
              <div className={styles.headerIcon} onClick={this.openModal}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
  }

const connectedConponent = connect(state => state)(Header)
export default connectedConponent