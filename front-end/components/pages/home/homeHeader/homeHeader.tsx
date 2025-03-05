import React from 'react'
import styles from "./homeHeader.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'

export default class HomeHeader extends React.Component {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      return (
        <>
          {/* <div className={styles.imageContainer}>
            <div className={styles.subtitle}>Частина грошей з кожної покупки на цьому сайті буде йти на допомогу ЗСУ</div>
            <div className={styles.subtitle}>Слава Україні!</div>
          </div> */}
          <div className={styles.sliderCcontainer} >
            <Swiper
              modules={[Navigation, Pagination ]}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
              loop={true}
              navigation
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
          </div>

        </>
      )
    }
  }