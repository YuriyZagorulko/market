import React, { useState } from 'react';
import { IProduct } from '../../../../helpers/types/responces/products';
import { productService } from '../../../../services/cabinet.service';
import AsideCollapse from '../AsideMenu/AsideCollapse/AsideCollapse';
import style from './mobileAside.module.scss';
import MobileAsideItem from './MobileAsideItem/MobileAsideItem';

interface IProps {
    isActive: {
        main: boolean,
        chosenCategory: boolean
    }
    products: IProduct[]
    onToggleMainClick: () => void
    onToggleCategory: () => void
    onChosenCategoryExitClick: () => void


}

function MobileAside(props: IProps) {
    const { isActive, products, onToggleMainClick, onChosenCategoryExitClick, onToggleCategory } = props
    return (
        <> 
            <aside className={isActive.main ? style.aside :style.hiden}>
                <div className={isActive.main ? style.sidenavWrapper : style.hiden}>
                    <div>
                        <div onClick={onToggleMainClick} className={style.sidenavHeader}><button className={style.closebtn}>
                            Фільтри </button></div>
                        <ul onClick={onToggleCategory} className={style.sideNavList}>
                            <MobileAsideItem  /></ul>
                    </div>

                    <div className={style.sidenavFooter}>
                        <div className={style.asideMobileFooterTop}></div>
                        <button onClick={onChosenCategoryExitClick} className={style.sidenavFooterClose}>Назад</button>
                    </div>
                </div>
                <div className={isActive.chosenCategory ? style.asideCategoryWrapper : style.hiden}>
                    <div>
                        <div onClick={onToggleCategory} className={style.sidenavHeader}>
                            <button className={style.closebtn}>someHeader </button>
                        </div>
                        <ul className={style.sideNavList}>
                            <AsideCollapse header={'someHeader'} categoriesQuantity={2} categories={['one', 'two']} />
                        </ul>
                    </div>

                    <div className={style.sidenavFooter}>
                        <div className={style.asideMobileFooterTop}>
                            {!!products?.length && <span className={style.asideMobileProductsCount}> Знайдено {products.length} товарів</span>}
                        </div>
                        <div className={style.asideButtonsGroupWrapper}>
                            <button onClick={onToggleCategory} className={style.sidenavFooterClose}>Назад</button>
                            <button onClick={onChosenCategoryExitClick} className={style.sidenavFooterMoreBtn}>Показати</button>
                        </div>

                    </div>
                </div>
            </aside>
            <div onClick={onChosenCategoryExitClick} className={isActive.main ? style.hideScreen : style.disabled} />
            

        </>

    )
}

export default React.memo(MobileAside)