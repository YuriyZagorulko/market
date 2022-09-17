import style from '../../styles/pages/Product.module.scss'
import { connect, useDispatch } from 'react-redux'
import { IProduct, getFirstImg, getProductImg } from '../../helpers/types/responces/products'
import Image from 'next/image'
import config from '../../config'
import { productService } from '../../services/product.service'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../helpers/constants/controls'
import { cartConstants } from '../../redux/reducers/cart.reducer'
import CustomImg from '../../components/shared/customImg/customImg'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Characteristics from '../../components/pages/product/characteristics/characteristics'

const Product = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const { productURL } = router.query
    if (productURL && !product) {
        productService.getProduct(productURL.toString()).then((data) => {
            setProduct(data)
        }).catch(err => {
            console.log(err)
        })
    }
    const buyProduct = () => {
        dispatch({type: cartConstants.ADD_PRODUCT, product})
        dispatch({type: controlsConstants.OPEN_CART})
    }

    return (
    <div className={style.wrapper}>
        {product ?
            <div className={style.content + ' global-width-limiter'}>
                <div className={style.top}>
                    <div className={style.topLeft}>
                        <div className={style.images}>
                            <div className={style.img} >
                                <CustomImg img={getProductImg(product)} />
                            </div>
                        </div>
                    </div>
                    <div className={style.topRight}>
                        <div className={style.title}>
                            {product.title}
                        </div>
                        <div className={style.description}>
                            {product.description}
                        </div>
                        <div className={style.trade}>
                            <div className={style.price}>
                                {product.price} ₴
                            </div>
                            <div className={style.buy}>
                                <button className={`button-primary`} onClick={buyProduct}>
                                    <FontAwesomeIcon className={style.buttonIcon} icon={faShoppingCart as IconProp} />
                                    Купить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.bottomLeft}>
                        <Characteristics characteristics={product.characteristics} />
                    </div>
                </div>
            </div>
        :
            <div className={style.content + ' global-width-limiter'}>
                no content loaded...
            </div>
        }
    </div>)
}

const connectedProductPage = connect(state => state)(Product)
export default connectedProductPage