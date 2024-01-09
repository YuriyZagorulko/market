import React from 'react'
import styles from 'searchHeader.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

type productLineProps = {
  title: string
}

function ProductLine (props: productLineProps) {
  return (
    <div className={styles.container}>
        <div className={styles.headerContent}>
            {/* breadcumbs should be here */}
            <div className={styles.title}>
                {}
            </div>
        </div>
    </div>
  )
}
export default ProductLine