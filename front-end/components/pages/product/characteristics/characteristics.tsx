import React, { useState, useEffect } from 'react'
import style from './characteristics.module.scss'
function Characteristics (props: { characteristics: any }) {
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

    console.log(props)
    return (
      <div className={style.characteristics}>
        <h2>Характеристики:</h2>
            {elems()}
      </div>
    )
}
export default Characteristics