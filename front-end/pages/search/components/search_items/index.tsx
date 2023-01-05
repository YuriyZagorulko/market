import style from './search_items.module.scss'
import React, { useState, useEffect } from 'react'
import { IPaginatedData } from '../../../../helpers/types'
import ProductPrev from '../../../../components/shared/productPrev/productPrev'

function SearchItems (props: { paginatedData :  IPaginatedData}) {
  const [state, setSate] = useState({
    data: props.paginatedData,
    rowsArr: []
  })
  useEffect(() => {
    setSate({ ...state, rowsArr: getRows()})
  }, [props.paginatedData])
  const getRows = () => {
    const rows = props.paginatedData?.data
    const arr = []
    for (let i = 0; i < rows?.length ; i++) {
      arr.push(
        <div key={i} className={style.gridItem}>
          <ProductPrev product={rows[i]} />
        </div>
      )
    }
    return arr
  }

  return (
    <div className={'wrapper'}>
      <div className={style.gridItems + ' wrapper'}>
        {state.rowsArr}
      </div>
    </div>
  )
}
export default SearchItems