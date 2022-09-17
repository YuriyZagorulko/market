import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { defaultProductImg } from '../../../helpers/constants/urls'

type ImgProps = {
  img: string
  previev?: string,
  imgProps?: any,
  alt?: string,
  layout?: string
}

function CustomImg (props: ImgProps){
  const [state, setState] = useState({
    isImageError: false,
    displayImg: defaultProductImg
  })
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
  }, [props.img, props.previev, state.isImageError])
  const imageErrorHandler = (err) => {
    setState({
      ...state,
      isImageError: true
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
    />
  )
}
export default CustomImg