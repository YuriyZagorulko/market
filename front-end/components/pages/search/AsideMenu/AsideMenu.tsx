import style from './asideMenu.module.scss'
import AsideCollapse from './AsideCollapse/AsideCollapse'
import PriceCollapse from './PriceCollapse/PriceCollapse'
import { IProduct } from '../../../../helpers/types/responces/products'
import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'

interface IProps {
    products: IProduct[]
}



function AsideMenu(props: IProps) {
    return (
        <aside className={style.sidebar}>
            <div className={style.sideBarContainer}>
                <PriceCollapse header={'Ціна'} products={props?.products} />
                <AsideCollapse categoriesQuantity={3} categories={['One', 'Two', 'Three']} header={'Бренд'} />

            </div>
        </aside>
    )


}

export default React.memo(AsideMenu)