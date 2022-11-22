import style from './search.module.scss'
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { ISearchParams, searchService } from '../../services/search.service'
import SearchItems from './components/search_items'
import Head from 'next/head'


function SearchPage() {
  const dispatch = useDispatch()
  const [{ requestData }, setSate] = useState({
    requestData: null
  })
  let paramsObj = {}
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    if (Object.keys(query)?.length > 0) {
      paramsObj = JSON.parse(query.params as string)

      searchService.search(paramsObj).then((val) => {
        setSate({ requestData: val })
      })
    }
  }, [query])


  return (
    <>
      <Head>
        <title>Результаты поиска по запросу | V16</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta name='description' content={`V16 - Результаты поиска по запросу: ${requestData?.config?.params?.text}`}></meta>
        <meta name="keywords" content=''></meta>
      </Head>
      <div className={'wrapper-horizontal' + ' global-width-limiter'}>
        {
          query.text &&
          <div className={style.searchTitle}>
            Результати пошуку за запитом {`<< ${query.text} >>`}
          </div>
        }
        {/* <div className={'search__order'}>
          sort order
        </div> */}
        {(requestData !== null && !requestData?.data?.count) ? <div className={style.nothingFound}>На жаль, за вашим запитом нічого не знайдено...</div> :
          (
            <div className={'search'}>
              {/* <div className={'search__filters'}>
              filters
            </div> */}
              <div className={'search__content'}>
                <SearchItems paginatedData={requestData?.data} />
              </div>
            </div>
          )
        }
      </div>
    </>

  )
}
const connectedSearchPage = connect(state => state)(SearchPage)
export default connectedSearchPage