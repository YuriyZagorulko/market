import style from '../../styles/pages/Product.module.scss'
import React from 'react'
import { connect } from 'react-redux'
import { IProduct, getFirstImg } from '../../helpers/types/responces/products'
import Image from 'next/image'
import config from '../../config'

// interface IProps {
// }
interface IState {
    product: IProduct
}
class ProductPage extends React.Component<{}, IState> {
    constructor(props) {
        super(props)

        this.state = {
            product: null,
        }
    }
    componentDidMount(){
        this.productService
    }
    render() {
        return (
            <div className={style.content + ' global-width-limiter'}>
                <div className={style.top}>
                    <div className={style.topLeft}>
                        <div className={style.images}>
                            <div className={style.img} >
                            <Image
                                src={config.apiUrl + getFirstImg(this.state.product)}
                                alt="Produt"
                                layout="fill"
                            />
                            </div>
                        </div>
                    </div>
                    <div className={style.topRight}>
                        top right
                    </div>
                </div>
                <div>bottom</div>
            </div>
        )
    }
}
const connectedProductPage = connect(state => state)(ProductPage)
export default connectedProductPage