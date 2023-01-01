import React from 'react'
import styles from "./homeHeader.module.scss"
import { useTranslation } from "react-i18next";


export default function HomeHeader(){
    const { t } = useTranslation('home')
  
      return (

        <div className={styles.container}>
          <div className={styles.subtitle}>{t('Частина грошей з кожної покупки на цьому сайті буде йти на допомогу ЗСУ')}</div>
          <div className={styles.subtitle}>{t('Слава Україні!')}</div>
        </div>
      )
    
  }