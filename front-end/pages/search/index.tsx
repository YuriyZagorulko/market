import style from "./search.module.scss"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { connect, useDispatch } from "react-redux"
import { searchService } from "../../services/search.service"
import SearchItems from "../../components/pages/search/search_items"
import AsideMenu from "../../components/pages/search/AsideMenu/AsideMenu"
import ProductsSortMenu from "../../components/pages/search/ProductsSortMenu/ProductsSortMenu"
import { controlsConstants } from "../../helpers/constants/controls"
import { IControlsState } from "../../redux/reducers/controls.reducer"
import MobileAside from "../../components/pages/search/MobileAside/MobileAside"
import Head from "next/head"
import { IGlobalSearchState, changeSearchData, setSearchPageNumber } from "../../redux/slices/search.slice"
import { IState } from "../../redux/store"
import { Pagination } from "antd"
import { IProduct } from "../../helpers/types/responces/products"


interface IProps {
  controls: IControlsState
  searchState: IGlobalSearchState
}

export interface ISearchResult{
  config?:{
    params?: {
      text: string
    }
  }
  data: {
    numPages: number
    currentPage: number
    data: IProduct []
    count: number
    totalItemsOnPage: number
  }
}

function SearchPage(props: IProps) {
  const dispatch = useDispatch()
  const [isMobileMenuActive, setIsMobileMenuActive] = useState({
    main: false,
    chosenCategory: false,
  })
  const { searchState } = props;
  const { pagination } = searchState;
  const [searchResult , setSearchResult] = useState<ISearchResult>({
    data: {
      numPages: 5,
      currentPage: 0,
      data: [],
      count: 0,
      totalItemsOnPage: 20,
    },
    
  })
  let paramsObj = {}
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    dispatch({type:controlsConstants.SHOW_LOADER})
    if (Object.keys(query)?.length > 0) {
      paramsObj = JSON.parse(query.search_params as string)
      dispatch(changeSearchData(paramsObj))
    }
  }, [query])

  useEffect(() => {
    dispatch({type:controlsConstants.SHOW_LOADER})
    searchService
      .search(searchState)
      .then((val) => {
        setSearchResult(val as any)
      })
      .finally(() => dispatch({ type: controlsConstants.HIDE_LOADER }))
  }, [searchState])
  
  function onToggleMobileAside() {
    setIsMobileMenuActive({
      ...isMobileMenuActive,
      main: !isMobileMenuActive.main,
    })
  }

  function onExitFromCategoryAside() {
    setIsMobileMenuActive({ main: false, chosenCategory: false })
  }

  function onToggleCategoryAside() {
    setIsMobileMenuActive({
      ...isMobileMenuActive,
      chosenCategory: !isMobileMenuActive.chosenCategory,
    })
  }

  const onPaginationChange = (page: number) => {
    dispatch(setSearchPageNumber(page))
  }

  return (
    <>
      <Head>
        <title>Результати за пошуком | V16</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content={`V16 - Результаты поиска по запросу: ${searchResult?.config?.params?.text}`}
        />
        <meta name="keywords" content=""/>
      </Head>
      {/* <MobileAside
        onToggleMainClick={onToggleMobileAside}
        onToggleCategory={onToggleCategoryAside}
        onChosenCategoryExitClick={onExitFromCategoryAside}
        isActive={isMobileMenuActive}
        products={requestData?.data?.data}
      /> */}

      {/* <ProductsSortMenu
        products={requestData?.data?.data}
        onFilterBtnClick={onToggleMobileAside}
        defaultSelectValue={"За рейтингом"}
        onChange={handleSortChange}
        sortOptions={[
          "За рейтингом",
          "Від дорогих к дешевим",
          "Від дешевих к дорогим",
        ]}
      /> */}

      <div
        style={{ flexDirection: "row" }}
        className={"wrapper-horizontal" + " global-width-limiter"}
      >
        {query.text && (
          <div className={style.searchTitle}>
            Результати пошуку за запитом {`<< ${query.text} >>`}
          </div>
        )}
        {/* <div className={'search__order'}>
          sort order
        </div> */}
        {searchResult !== null && !searchResult?.data?.count ? (
          <div className={style.nothingFound}>
            На жаль, за вашим запитом нічого не знайдено...
          </div>
        ) : (
          <div className={style.search}>
            <div className={style.searchFiltersContainer}>
              <AsideMenu />
            </div>
            <div className={style.searchContent}>
              <div className={style.searchContentItems}>
                <SearchItems paginatedData={searchResult?.data} />
              </div>
              <div className={style.searchPagination}>
                <Pagination 
                  current={searchResult.data.currentPage} 
                  onChange={onPaginationChange} 
                  total={searchResult.data.count} 
                  pageSize={searchResult.data.totalItemsOnPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state: IState) => {
  const searchState = state.globalSearch
  return {
    searchState
  };
};
const connectedSearchPage = connect(mapStateToProps)(SearchPage)
export default connectedSearchPage

