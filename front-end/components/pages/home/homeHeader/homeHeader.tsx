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
import { redirectToCategory } from '../../../../helpers/other'
import { useRouter } from 'next/router'

const slides = [
  {
    imgPath: '/images/pages/home/mechanic-changing-engine-oil-car-vehicle-min.jpg',
    link: '',
    title: 'Моторні мастина',
    subtitle: 'Висока якість для тривалої роботи',
  },
  {
    imgPath: '/images/pages/home/tools-2145770_1280-min.jpg',
    link: '',
    title: 'Інструменти',
    subtitle: 'Все для швидкого та якісного обслуговування',
  }
];
export default function HomeHeader (){
    const router = useRouter()
    const handleSliderClick = e => {
      redirectToCategory({ keyWord: e.key } as any, router)();
    }
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
            {slides.map((slide) => (
              <SwiperSlide >
                <button className='slider-content-wrapper' onClick={handleSliderClick}>
                    <img className={'slide-img'} src={slide.imgPath} alt="slide" />
                    <div className={'slide-content-text'}>
                      <div className={'slide-title'}>{slide.title}</div>
                      <div className={'slide-subtitle'}>{slide.subtitle}</div>
                    </div>
                </button>
              </SwiperSlide>
            ))}
            
          </Swiper>
        </div>

      </>
    )
}