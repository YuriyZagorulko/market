import style from '../../styles/pages/Product.module.scss'
import { connect, useDispatch } from 'react-redux'
import { IProduct, getFirstImg } from '../../helpers/types/responces/products'
import Image from 'next/image'
import config from '../../config'
import { productService } from '../../services/product.service'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { controlsConstants } from '../../helpers/constants/controls'
import { cartConstants } from '../../redux/reducers/cart.reducer'

// interface IProps {
//     router: NextRouter
// }

// interface IState {
//     product: IProduct
// }
// class ProductPage extends React.Component<IProps, IState> {
//     productId = ''
//     constructor(props) {
//         super(props)
//         const queryKey = 'productURL'
//         const queryValue = this.props.router.query[queryKey] || this.props.router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
//         debugger
//         this.productId = props.router.query
//         this.state = {
//             product: null,
//         }
//     }
//     componentDidMount(){

//         const { id } = this.props.router.query
//         debugger
//         const product = productService.getProduct(this.productId)
//     }
//     render() {
//         debugger
//         return (
//             <div className={style.content + ' global-width-limiter'}>
//                 <div className={style.top}>
//                     <div className={style.topLeft}>
//                         <div className={style.images}>
//                             <div className={style.img} >
//                             <Image
//                                 src={config.apiUrl}
//                                 alt="Produt"
//                                 layout="fill"
//                             />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={style.topRight}>
//                         top right
//                     </div>
//                 </div>
//                 <div>bottom</div>
//             </div>
//         )
//     }
// }


// const connectedProductPage = connect(state => state)(ProductPage)
// export default withRouter(connectedProductPage)


const Post = () => {
const dispatch = useDispatch()
const router = useRouter()
const [product, setProduct] = useState(null)
const { productURL } = router.query
if (productURL && !product) {
    productService.getProduct(productURL.toString()).then((data) => {
        setProduct(data)
    })
}

const buyProduct = () => {
    dispatch({type: cartConstants.ADD_PRODUCT, product})
    dispatch({type: controlsConstants.OPEN_CART})
}

return (<div className={style.wrapper}>
    {product ?
        <div className={style.content + ' global-width-limiter'}>
            <div className={style.top}>
                <div className={style.topLeft}>
                    <div className={style.images}>
                        <div className={style.img} >
                            <Image
                                src={config.apiUrl + getFirstImg(product)}
                                alt="Produt"
                                layout="fill"
                            />
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
                                <FontAwesomeIcon className={style.buttonIcon} icon={faShoppingCart} />
                                Купить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>bottom</div>
        </div>
    :
        <div className={style.content + ' global-width-limiter'}>
            no content loaded...
        </div>
    }
</div>)
}

const connectedProductPage = connect(state => state)(Post)
export default Post