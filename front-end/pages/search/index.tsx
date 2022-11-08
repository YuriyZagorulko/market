import style from './search.module.scss'
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { ISearchParams, searchService } from '../../services/search.service'
import SearchItems from './components/search_items'
import AsideMenu from '../../components/pages/search/AsideMenu/AsideMenu'
import ProductsSortMenu from '../../components/pages/search/ProductsSortMenu/ProductsSortMenu'
import { controlsConstants } from '../../helpers/constants/controls'
import Loader from '../../components/shared/Loader/Loader'
import { IControlsState } from '../../redux/reducers/controls.reducer'
import MobileAside from '../../components/pages/search/MobileAside/MobileAside'

interface IProps {
  controls: IControlsState
}

function SearchPage(props: IProps) {
  const dispatch = useDispatch()
  const [isMobileMenuActive, setIsMobileMenuActive] = useState({
    main: false,
    chosenCategory: false
  })
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
      }).finally(() => dispatch({ type: controlsConstants.HIDE_LOADER }))
    }
  }, [query])

  function onToggleMobileAside() {
    setIsMobileMenuActive({
      ...isMobileMenuActive,
      main: !isMobileMenuActive.main
    })
  }
  function onExitFromCategoryAside() {
    setIsMobileMenuActive({ main: false, chosenCategory: false })
  }
  function onToggleCategoryAside() {
    setIsMobileMenuActive({ ...isMobileMenuActive, chosenCategory: !isMobileMenuActive.chosenCategory })
  }

  return (
    <>
      <MobileAside onToggleMainClick={onToggleMobileAside}
        onToggleCategory={onToggleCategoryAside}
        onChosenCategoryExitClick={onExitFromCategoryAside}
        isActive={isMobileMenuActive} products={requestData?.data.data} />
      {props.controls.isLoaderShown && <Loader />}

      <ProductsSortMenu products={requestData?.data.data} onFilterBtnClick={onToggleMobileAside}
        defaultSelectValue={'За рейтингом'} sortOptions={['За рейтингом', 'Від дорогих к дешевим', 'Від дешевих к дорогим']} />

      <div style={{ flexDirection: 'row' }} className={'wrapper-horizontal' + ' global-width-limiter'}>
        <AsideMenu products={requestData?.data?.data} />
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