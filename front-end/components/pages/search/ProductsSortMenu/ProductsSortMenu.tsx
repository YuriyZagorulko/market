import { Select, SelectProps } from "antd"
import style from './productsSortMenu.module.scss'
import { IProduct } from "../../../../helpers/types/responces/products"
import React from "react"

interface IProps {
    sortOptions: string[],
    defaultSelectValue: string
    products: IProduct[]
    onFilterBtnClick: () => void
    onChange: (e: any) => void
}
function ProductsSortMenu(props: IProps) {

    const options: SelectProps['options'] = []
    for (let i = 0; i < props.sortOptions.length; i++) {
        options.push({
            value: props.sortOptions[i],
            label: props.sortOptions[i],
        })
    }


    return (
        <div className={'global-width-limiter'}>
            <div className={style.sortMenuWrapper}>
                <div className={style.leftSideItemsWrapper}>
                    <button onClick={props.onFilterBtnClick} className={style.mobileSortBtn}>Фільтри</button>
                    <span className={style.productsCount}>Всього товарів: {props.products?.length}</span>
                </div>

                <div className={style.selectWrapper}>
                    {/* <Select
                        bordered={false}
                        showArrow={false}
                        className={style.select}
                        size={'middle'}
                        defaultValue={props.defaultSelectValue}
                        onChange={props.onChange}
                        options={options}
                    /> */}
                </div>
            </div>

        </div>


    )

}

export default React.memo(ProductsSortMenu)