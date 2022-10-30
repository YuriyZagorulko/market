import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { defaultProductImg } from '../../../helpers/constants/urls'
import imgPreview from '../../../public/images/whileImgLoadPREVIEW.jpeg'


type ImgProps = {
  img: string
  previev?: string,
  imgProps?: any,
  alt?: string,
  layout?: string,
}

function CustomImg (props: ImgProps){
  const [state, setState] = useState({
    isImageError: false,
    isShowPreview: true,
    displayImg: defaultProductImg,
  })
  useEffect(() => {
    if (!state.isImageError) {
      if (props.img) {
        setState({
          ...state,
          displayImg: state.isShowPreview ? imgPreview.src : props.img 
        })
      }
    } else {
      setState({
        ...state,
        displayImg: props.previev ? props.previev : defaultProductImg
      })
    }
  }, [props.img, props.previev, state.isImageError,state.isShowPreview])
  const imageErrorHandler = (err) => {
    setState({
      ...state,
      isImageError: true
    })
  }
  const productImgLoadHandler = ()=>{
    setState({
      ...state,
      isShowPreview:false
    })
  }
  return (
    <Image
      src={ state.displayImg }
      alt="Img"
      layout="fill"
      objectFit='contain'
      { ...props.imgProps }
      onError={imageErrorHandler}
      onLoad={productImgLoadHandler}
    />
  )
}
export default CustomImg