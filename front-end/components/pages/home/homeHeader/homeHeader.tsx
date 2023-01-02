import React from 'react'
import styles from "./homeHeader.module.scss"
import { useTranslation } from "react-i18next";


export default function HomeHeader(){
    const { t: trans } = useTranslation('home')
  
      return (

        <div className={styles.container}>
          <div className={styles.subtitle}>{trans('homeheader.top')}</div>
          <div className={styles.subtitle}>{trans('homeheader.bottom')}</div>
        </div>
      )
    
  }