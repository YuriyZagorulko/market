import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { defaultProductImg } from '../../../helpers/constants/urls'
import imgPreview from '../../../public/images/whileImgLoadPREVIEW.jpeg'
import style from './customImg.module.scss'


type ImgProps = {
  img: any
  previev?: string,
  imgProps?: any,
  alt?: string,
  layout?: string,
}

function CustomImg(props: ImgProps) {
  const [state, setState] = useState({
    isImageError: false,
    isShowPreview: true,
    displayImg: defaultProductImg,
  })

  const imageErrorHandler = (err) => {
    setState({
      ...state,
      isImageError: true
    })
  }
  useEffect(() => {
    if (!state.isImageError) {
      if (props.img) {
        setState({
          ...state,
          displayImg: props.img
        })
      }
    } else {
      setState({
        ...state,
        displayImg: props.previev ? props.previev : defaultProductImg
      })
    }
  }, [props.img, props.previev, state.isImageError, state.isShowPreview])

  const productImgLoadHandler = () => {
    setState({
      ...state,
      isShowPreview: false
    })
  }

  return (
    <React.Fragment>
      <Image src={imgPreview}
        className={state.isShowPreview ? style.visible : style.invisible}
        layout="fill"
        objectFit='contain'
        {...props.imgProps}
      />
      <Image
        className={state.isShowPreview ? style.invisible : style.visible}
        src={state.displayImg}
        alt='Img'
        layout="fill"
        objectFit='contain'
        {...props.imgProps}
        onError={imageErrorHandler}
        onLoadingComplete={productImgLoadHandler}
      />
    </React.Fragment>

  )

}
export default CustomImg