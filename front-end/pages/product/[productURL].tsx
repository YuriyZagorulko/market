import style from '../../styles/pages/Product.module.scss'
import { connect, useDispatch } from 'react-redux'
import { IProduct, getFirstImg, getProductImg, getPreviewImgUrl } from '../../helpers/types/responces/products'
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
import Head from 'next/head'
import { storeContacts } from '../../helpers/constants/storeDataConstants/storeContacts'

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
        dispatch({ type: cartConstants.ADD_PRODUCT, product })
        dispatch({ type: controlsConstants.OPEN_CART })
    }
    console.log(product)
    console.log(router)

    return (
        <>
            <Head>
                <title>{product?.title} ({storeContacts.MOBILE_NUMBER}). Купить Киев, Днепр, с доставкой по Украине за {product?.price} грн: цена, характеристики, отзывы. V16 | Україна.</title>
                <meta name='description' content={`Купить ${product?.title} (${storeContacts.MOBILE_NUMBER}) с гарантией. Отзывы. Характеристики. Фото. Доставка в Киев, Харьков, Днепр, Одессу и другие города Украины.`}></meta>
                <meta name="robots" content="index, follow"></meta>
                <meta name="keywords" content={`${product?.title} (${storeContacts.MOBILE_NUMBER}) купить, цена, отзывы, характеристики, описание, фото, интернет-магазин, автопринадлежности, автотовары, Киев, Україна, v16`}></meta>
                <meta property="og:title" content={`${product?.title} (${storeContacts.MOBILE_NUMBER})`} />
                <meta property="og:type" content="product"></meta>
                <meta property="og:url" content={`${config.mainDomain}${router.asPath}`} />
                <meta property="og:image" content={getPreviewImgUrl(product)} />
                <meta property="og:description" content={`Купить ${product?.title} (${storeContacts.MOBILE_NUMBER}) с гарантией. Отзывы. Характеристики. Фото. Доставка в Киев, Харьков, Днепр, Одессу и другие города Украины.`} />
            </Head>
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
                                            Купити
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
            </div>
        </>)
}

const connectedProductPage = connect(state => state)(Product)
export default connectedProductPage