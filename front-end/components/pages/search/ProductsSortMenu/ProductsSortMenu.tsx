import { Select } from "antd";
import style from './productsSortMenu.module.scss';
import type { SelectProps } from 'antd';
import { IProduct } from "../../../../helpers/types/responces/products";
import React from "react";

interface IProps{
    sortOptions:string[],
    defaultSelectValue:string
    products:IProduct[]
    onFilterBtnClick: ()=>void
}
function ProductsSortMenu(props:IProps){
    
const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
};
      

const options: SelectProps['options'] = [];
for (let i = 0; i < props.sortOptions.length; i++) {
  options.push({
    value: props.sortOptions[i],
    label: props.sortOptions[i],
  });
}


    return(
        <div className={'global-width-limiter'}>
            <div className={style.sortMenuWrapper}>
                <React.Fragment>
                    <button onClick={props.onFilterBtnClick} className={style.mobileSortBtn}>Фільтри</button>
                    <span>Всього товарів: {props.products?.length}</span>
                </React.Fragment>
               
                <div className={style.selectWrapper}>
                    <Select
                    bordered={false}
                    showArrow={false}
                    className={style.select}
                    size={'middle'}
                    defaultValue={props.defaultSelectValue}
                    onChange={handleChange}
                    options={options}
                />
                </div>
            </div>
      
        </div>
        
      
    )

}

export default ProductsSortMenu