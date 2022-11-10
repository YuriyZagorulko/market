import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import style from './carousel.module.scss';




interface IProps {
    images: any
}

export const Carousel = (props: IProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    useEffect(() => {
        if (props.images.length) {
            setThumbsSwiper(props.images)
        }
    }, [props.images])

    return (
        <article>
            <div className={style.sliderWrapper}>
                <Swiper loop={true} navigation={true} modules={[Navigation, Thumbs]} grabCursor={true} className='product-images-slider' thumbs={{ swiper: thumbsSwiper }} >
                    {props.images.map((el,i) => <SwiperSlide key={i} className={style.mainSlide}><img className={style.sliderImg}
                        src={el} alt="slide" /></SwiperSlide>)}
                </Swiper>
            </div>


            <div className={style.thumbsWrapper}>
                <Swiper className='product-images-slider-thumbs'
                    modules={[Thumbs]}
                    watchSlidesProgress
                    slidesPerView={5}
                    onSwiper={setThumbsSwiper}>
                    {props.images.map((el,i) => <SwiperSlide key={i} className={style.sliderThumb}>
                        <button className='product-images-slider-thumbs-wrapper'>
                            <img className={style.sliderThumb} src={el} alt="slide" />
                        </button></SwiperSlide>)}
                </Swiper>
            </div>

        </article>
    )
}