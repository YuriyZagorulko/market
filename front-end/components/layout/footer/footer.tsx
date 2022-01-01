import React from 'react'
import styles from "./footer.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

type headerProps = {
  name?: string
}
type headerState = {
  headerBanner?: string
}
export default class Welcome extends React.Component<headerProps, headerState> {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <div className={styles.footer}>
          <div className={`${styles.footerContent} global-width-limiter`}>
              <div className={styles.footerContact}>
              <Link href="/help">
                <a>Помощь</a>
              </Link>
              <Link href="/contact">
                <a>Контакты</a>
              </Link>
              </div>
              <div className={styles.footerSocial}>
                <Link href="/">
                  <div>
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                </Link>
                <Link href="/">
                  <div>
                    <FontAwesomeIcon icon={faYoutube} />
                  </div>
                </Link>
                <Link href="/">
                  <div>
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                </Link>
              </div>
          </div>
        </div>
      )
    }
  }