import { Slider, Switch } from 'antd';
import { useEffect, useState } from 'react';
import style from './priceCollapse.module.scss'
import collapseTopStyle from './../AsideCollapse/asideCollapse.module.scss'
import React from 'react';
import { IProduct } from '../../../../../helpers/types/responces/products';
import { useDispatch } from 'react-redux';
import { changeSearchData } from '../../../../../redux/slices/search.slice';
interface IProps {
    header: string
}
const getMinMaxPrices = (products: IProduct[]) => {
    let allPrices: number[] = []
    products.forEach((el) => allPrices.push(el.price))
    return { min: Math.min(...allPrices), max: Math.max(...allPrices) }
}

const PriceSlider = (props: IProps) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({minValue: 1, maxValue: 100000})
    const [minVal, setMinVal] = useState(1)
    const [maxVal, setMaxVal] = useState(100000)
    const [isItemActive, setIsItemActive] = useState<boolean>(true)

    useEffect (() => {
        dispatch(changeSearchData({ priceFrom: values.minValue, priceTo: values.maxValue }))
    }, [values])

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
                    {values && <Slider min={minVal} max={maxVal} onChange={onSliderChange}  range defaultValue={[minVal, maxVal]} />}
                </div>

            </div>
        </>
    );
};
export default React.memo(PriceSlider)

