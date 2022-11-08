import { Slider, Switch } from 'antd';
import { useEffect, useState } from 'react';
import style from './priceCollapse.module.scss'
import collapseTopStyle from './../AsideCollapse/asideCollapse.module.scss'
import React from 'react';
interface IProps {
    minValue: number,
    maxValue: number,
    header: string
}

const PriceSlider = (props: IProps) => {
    const [values, setValues] = useState({ minValue: props.minValue, maxValue: props.maxValue })
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
    return (
        <>
            <div className={collapseTopStyle.collapseWrapper}>
                <button onClick={handleToggleCollapse} className={collapseTopStyle.collapseButton}>
                    <span className={collapseTopStyle.collapseHeader}>{props.header}
                        <img className={isItemActive ? collapseTopStyle.collapseChevronActive : collapseTopStyle.collapseChevron} src='/images/icons/downArrow.svg' alt="arrow" />
                    </span>
                </button>
                <div className={isItemActive ? style.inputsWrapper : style.displayNone}>
                    <input onChange={onInputMinChange} className={style.collapseInput} value={values.minValue} />
                    <span className={style.inputDash}>—</span>
                    <input onChange={onInputMaxChange} className={style.collapseInput} value={values.maxValue} />
                    <button className={style.collapseButton}>ok</button>
                    <Slider min={props.minValue} max={props.maxValue} onChange={onSliderChange} range defaultValue={[10, props?.maxValue]} />
                </div>

            </div>
        </>
    );
};
export default React.memo(PriceSlider)

