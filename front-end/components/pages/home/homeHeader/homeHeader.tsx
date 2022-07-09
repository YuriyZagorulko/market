import React from 'react'
import styles from "./homeHeader.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

// type headerProps = {
//   name?: string
// }
// type headerState = {
//   headerBanner?: string
// }
export default class HomeHeader extends React.Component {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      return (<div className={styles.container}>
        <div className={styles.subtitle}>Частина грошей з кожної покупки на цьому сайті буде йти на допомогу ЗСУ</div>
        <div className={styles.subtitle}>Слава Україні!</div>
      </div>)
    }
  }