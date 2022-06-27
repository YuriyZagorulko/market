import React, { useEffect, useState } from 'react'
import styles from "./productListItem.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IOrder } from '../../../helpers/types/orders'
import { connect } from 'react-redux'
import { Collapse, Select } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import { getPreviewImgUrl } from '../../../helpers/types/responces/products'
import { defaultProductImg } from '../../../helpers/constants/urls'

type ImgProps = {
  img: string
  previev?: string,
  imgProps?: any
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