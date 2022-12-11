import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import style from './carousel.module.scss';




interface IProps {
    images: any
}

export const Carousel = (props: IProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isFullScreenOpen,setIsFullScreenOpen] = useState(false)
    useEffect(() => {
        if (props.images.length) {
            setThumbsSwiper(props.images)
        }
    }, [props.images])

    function handleSliderImgClick(){
        setIsFullScreenOpen(!isFullScreenOpen)
    }

    return (
        <article>
            <div className={isFullScreenOpen? style.sliderWrapperFS : style.sliderWrapper}>
                <Swiper onClick={handleSliderImgClick} loop={true} navigation={true} modules={[Navigation, Thumbs]} grabCursor={true} className='product-images-slider' thumbs={{ swiper: thumbsSwiper }} >
                    {props.images.map((el,i) => <SwiperSlide key={i} className={isFullScreenOpen ? style.mainSlideFS : style.mainSlide}><img className={isFullScreenOpen ? style.sliderImgFS: style.sliderImg }
                        src={el} alt="slide" /></SwiperSlide>)}
                </Swiper>
            </div>

            
            <div className={isFullScreenOpen ? style.disabled : style.thumbsWrapper}>
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