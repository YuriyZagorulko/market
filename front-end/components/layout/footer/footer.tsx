import React from 'react'
import styles from "./footer.module.scss"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { withTranslation } from 'next-i18next';

type headerProps = {
  name?: string
}
type headerState = {
  headerBanner?: string
}
class Welcome extends React.Component<headerProps, headerState> {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <footer className={styles.footer}>
          <div className={`${styles.footerContent} global-width-limiter`}>
              <div className={styles.footerContact}>
              <Link href="/help">
                <a>{this.props.t('help')}</a>
              </Link>
              <Link href="/contact-us">
                <a>{this.props.t('contacts')}</a>
              </Link>
              </div>
              <div className={styles.footerSocial}>
                <Link href="/">
                  <div>
                    <FontAwesomeIcon icon={faYoutube as IconProp} />
                  </div>
                </Link>
                <Link href="/">
                  <div>
                    <FontAwesomeIcon icon={faInstagram as IconProp} />
                  </div>
                </Link>
              </div>
          </div>
        </footer>
      )
    }
  }

  export default withTranslation('layout')(Welcome)