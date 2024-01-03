import style from './asideMenu.module.scss'
import AsideCollapse from './AsideCollapse/AsideCollapse'
import PriceCollapse from './PriceCollapse/PriceCollapse'
import { IProduct } from '../../../../helpers/types/responces/products'
import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import CustomBtn from '../../../shared/customBtn/customBtn'

interface IProps {
    
}



function AsideMenu(props: IProps) {
    const searchHandler = () => {

    }
    return (
        <aside className={style.sidebar}>
            <div className={style.sideBarContainer}>
                <PriceCollapse header={'Ціна'} />
                {/* <AsideCollapse categoriesQuantity={3} categories={['One', 'Two', 'Three']} header={'Бренд'} /> */}
                <div className={style.searchButtonContainer}>
                    <CustomBtn
                        type="primary"
                        onClick={searchHandler}
                        style={{fontSize: '18px', height: 'auto', padding: '5px 20px'}}
                    >
                        Пошук
                    </CustomBtn>
                </div>
                
            </div>
        </aside>
    )


}

export default React.memo(AsideMenu)