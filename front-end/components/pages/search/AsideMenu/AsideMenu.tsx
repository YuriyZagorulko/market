import style from './asideMenu.module.scss'
import AsideCollapse from './AsideCollapse/AsideCollapse'
import PriceCollapse from './PriceCollapse/PriceCollapse'
import { IProduct } from '../../../../helpers/types/responces/products'
import { useEffect, useState } from 'react'
import React from 'react'

interface IProps {
    products: IProduct[]
}
function AsideMenu(props: IProps) {
    const [minMaxPrices, setMinMaxPrices] = useState({ min: 0, max: 0 })

    const getMinMaxPrices = (products: IProduct[]) => {
        let allPrices: number[] = []
        products.forEach((el) => allPrices.push(el.price))
        setMinMaxPrices({ min: Math.min(...allPrices), max: Math.max(...allPrices) })
    }

    useEffect(() => {
        if (props.products) {
            getMinMaxPrices(props.products)
        }
    }, [props.products])
    return (
        <aside className={style.sidebar}>
            <div className={style.sideBarContainer}>
                {!!minMaxPrices.max && <PriceCollapse header={'Ціна'} minValue={minMaxPrices.min} maxValue={minMaxPrices.max} />}
                <AsideCollapse categoriesQuantity={3} categories={['One', 'Two', 'Three']} header={'Бренд'} />

            </div>
        </aside>
    )


}

export default React.memo(AsideMenu)