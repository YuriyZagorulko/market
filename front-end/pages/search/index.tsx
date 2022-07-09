import style from './search.module.scss'
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { ISearchParams, searchService } from '../../services/search.service'
import SearchItems from './components/search_items'


function SearchPage () {
  const dispatch = useDispatch()
  const [{requestData}, setSate] = useState({
    requestData: null
  })
  let paramsObj = {}
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    if (Object.keys(query)?.length > 0) {
      console.log(query)
      paramsObj = JSON.parse(query.params  as string)

      searchService.search(paramsObj).then((val) => {
        setSate({requestData: val})
      })
    }
  }, [query])
  return (
    <div className={'wrapper-horizontal' + ' global-width-limiter'}>
      {
        query.text &&
        <div className={style.searchTitle}>
            Результаты поиска по запросу {`<< ${query.text} >>`}
        </div>
      }
      {/* <div className={'search__order'}>
          sort order
        </div> */}
      { (requestData !== null && !requestData?.data?.count) ? <div className={style.nothingFound}>К сожалению, по вашему запросу ничего не найдено...</div> :
        (
          <div className={'search'}>
            {/* <div className={'search__filters'}>
              filters
            </div> */}
            <div className={'search__content'}>
              <SearchItems paginatedData={requestData?.data}/>
            </div>
          </div>
        )
      }
    </div>
  )
}
const connectedSearchPage = connect(state => state)(SearchPage)
export  default connectedSearchPage