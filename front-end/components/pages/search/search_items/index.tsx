import style from './search_items.module.scss'
import React, { useState, useEffect } from 'react'
import ProductPrev from '../../../shared/productPrev/productPrev'
import { IProduct } from '../../../../helpers/types/responces/products'

interface IProps {
  data: IProduct []
}

function SearchItems (props: { paginatedData :  IProps }) {
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
    <div style={{width: '100%'}}>
      <div className={style.gridItems + ' wrapper'}>
        {state.rowsArr}
      </div>
    </div>
  )
}
export default SearchItems