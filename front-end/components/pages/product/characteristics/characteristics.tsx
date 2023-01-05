import React, { useState, useEffect } from 'react'
import style from './characteristics.module.scss'
import { useTranslation } from 'next-i18next'

function Characteristics (props: { characteristics: any }) {
    const { t : trans } = useTranslation('product')
    const elems = () => {
        const res = []
        let i = 0
        for (const key in props.characteristics) {
            if (props.characteristics[key]) {
                res.push(
                    <div key={i} className={style.characteristicsItem}>
                        <dt>{key}</dt>
                        <div className={style.dots} />
                        <dd>{props.characteristics[key]}</dd>
                    </div>
                )
                i++
            }
        }
        return res
    }

    if (props.characteristics) {
        return (
        <div className={style.characteristics}>
            <h2>{trans('deliveryDetails.characteristics')}:</h2>
                {elems()}
        </div>
        )
    } else {
        return <></>
    }
}
export default Characteristics