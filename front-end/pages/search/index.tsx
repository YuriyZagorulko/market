import style from './search.module.scss'
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { ISearchParams, searchService } from '../../services/search.service'


function SearchPage () {
  const dispatch = useDispatch()
  const [{paginatedData}, setSate] = useState({
    paginatedData: {}
  })
  const router = useRouter()
  const searchParams : ISearchParams = router.query

  useEffect(() => {
    if (Object.keys(searchParams)?.length > 0) {
      searchService.search(searchParams).then((val) => {
        setSate({paginatedData: val})
      })
    }
  }, [searchParams])
  return (
    <div className={'wrapper-horizontal' + ' global-width-limiter'}>
      <div className={'search__title'}>
        Seatch title
      </div>
      {/* <div>
        search sort order
      </div> */}
      <div className={'search'}>
        <div className={'search__filters'}>
          filters
        </div>
        <div className={'search__content'}>
          content
        </div>
      </div>
    </div>
  )
}
const connectedSearchPage = connect(state => state)(SearchPage)
export  default connectedSearchPage