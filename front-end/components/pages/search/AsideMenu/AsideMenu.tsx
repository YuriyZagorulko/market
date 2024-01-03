import style from './asideMenu.module.scss'
import AsideCollapse from './AsideCollapse/AsideCollapse'
import PriceCollapse from './PriceCollapse/PriceCollapse'
import { IProduct } from '../../../../helpers/types/responces/products'
import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import CustomBtn from '../../../shared/customBtn/customBtn'
import { useRouter } from 'next/router'
import { IGlobalSearchState } from '../../../../redux/slices/search.slice'
import { IState } from '../../../../redux/store'
import { connect } from 'react-redux'

interface IProps {
    searchState?: IGlobalSearchState
}



function AsideMenu(props: IProps) {
    const router = useRouter()
    const searchHandler = () => {
        router.push({
            pathname: '/search',
            query: { search_params: JSON.stringify(props.searchState) }
          }, 
          undefined, { shallow: true }
          )
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
const mapStateToProps = (state: IState) => {
    const searchState = state.globalSearch
    return {
        searchState
    };
};
const connectedAsideMenu = connect(mapStateToProps)(AsideMenu)
export default connectedAsideMenu