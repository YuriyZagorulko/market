import { Slider, Switch } from 'antd';
import { useEffect, useState } from 'react';
import style from './priceCollapse.module.scss'
import collapseTopStyle from './../AsideCollapse/asideCollapse.module.scss'
import React from 'react';
import { IProduct } from '../../../../../helpers/types/responces/products';
interface IProps {
    products: IProduct[]
    header: string
}
const getMinMaxPrices = (products: IProduct[]) => {
    let allPrices: number[] = []
    products.forEach((el) => allPrices.push(el.price))
    return { min: Math.min(...allPrices), max: Math.max(...allPrices) }
}

const PriceSlider = (props: IProps) => {
    const [values, setValues] = useState({minValue:0,maxValue:0})
    const [minMaxByProduct, setMinMaxByProduct] = useState(null)
    const [isItemActive, setIsItemActive] = useState<boolean>(true)

    const onInputMaxChange = (e) => {
        setValues({ ...values, maxValue: e.target.value })
    }
    const onInputMinChange = (e) => {
        setValues({ ...values, minValue: e.target.value })
    }
    const onSliderChange = (newValue) => {
        setValues({ minValue: newValue[0], maxValue: newValue[1] });
    };
    const handleToggleCollapse = () => {
        setIsItemActive(!isItemActive)
    }
    useEffect(() => {
        if (props.products?.length) {
            const { min, max } = getMinMaxPrices(props.products)
            setMinMaxByProduct({ min: min, max: max })
            setValues({ minValue: min, maxValue: max })
        }
    }, [props.products])

    return (
        <>
            <div className={collapseTopStyle.collapseWrapper}>
                <button onClick={handleToggleCollapse} className={collapseTopStyle.collapseButton}>
                    <span className={collapseTopStyle.collapseHeader}>{props.header}
                        <img className={isItemActive ? collapseTopStyle.collapseChevronActive : collapseTopStyle.collapseChevron} src='/images/icons/downArrow.svg' alt="arrow" />
                    </span>
                </button>
                <div className={isItemActive ? style.inputsWrapper : style.displayNone}>
                    <input onChange={onInputMinChange} className={style.collapseInput} value={values?.minValue} />
                    <span className={style.inputDash}>—</span>
                    <input onChange={onInputMaxChange} className={style.collapseInput} value={values?.maxValue} />
                    <button className={style.collapseButton}>ok</button>
                    {minMaxByProduct && <Slider min={minMaxByProduct?.min} max={minMaxByProduct?.max} onChange={onSliderChange}  range defaultValue={[minMaxByProduct?.min, minMaxByProduct?.max]} />}
                </div>

            </div>
        </>
    );
};
export default React.memo(PriceSlider)

