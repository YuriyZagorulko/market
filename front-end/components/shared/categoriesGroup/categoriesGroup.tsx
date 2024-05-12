import React from 'react'
import styles from './categoriesGroup.module.scss'
import { IProductCategory } from '../../../helpers/types'
import { NextRouter, useRouter } from 'next/router'
import { getStringPreviewImgUrl } from '../../../helpers/types/responces/products'
import CustomImg from '../customImg/customImg'
import { redirectToCategory } from '../../../helpers/other'

type productLineProps = {
  categories: IProductCategory []
  title?: string
}

const categoryItem = (category: IProductCategory, router: NextRouter)  => {
  return (
    <div className={styles.categoryWrapper}>
      <a onClick={redirectToCategory(category, router)} className={styles.content}>
        <div className={styles.categoryTop}>
          <div className={styles.categoryImage}>
            <CustomImg img={getStringPreviewImgUrl(category.image)} />
          </div>
        </div>
        <div className={styles.categoryBottom}>
          <div className={styles.categoryName}>
            {category.name_UA}
          </div>
        </div>
      </a>
    </div>
  )
} 

function categoriesGroup (props: productLineProps) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      {props.title && (
        <div className={styles.head}>
          <h2 className={styles.title}>{props.title}</h2>
        </div>
      )}
      
      <ul className={styles.content}>
        {props.categories.map((product: IProductCategory, index) => {
          if (index < 6) {
            return <li className={styles.product} key={index}>
              {categoryItem(product, router)}
            </li>
          }
        })}
      </ul>
    </div>
  )
}
export default categoriesGroup