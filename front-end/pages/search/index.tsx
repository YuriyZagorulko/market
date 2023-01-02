import style from "./search.module.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { searchService } from "../../services/search.service";
import SearchItems from "./components/search_items";
import AsideMenu from "../../components/pages/search/AsideMenu/AsideMenu";
import ProductsSortMenu from "../../components/pages/search/ProductsSortMenu/ProductsSortMenu";
import { controlsConstants } from "../../helpers/constants/controls";
import Loader from "../../components/shared/Loader/Loader";
import { IControlsState } from "../../redux/reducers/controls.reducer";
import MobileAside from "../../components/pages/search/MobileAside/MobileAside";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";


interface IProps {
  controls: IControlsState;
}

function SearchPage(props: IProps) {
  const dispatch = useDispatch();
  const { t : trans } = useTranslation('search')
  const [isMobileMenuActive, setIsMobileMenuActive] = useState({
    main: false,
    chosenCategory: false,
  });
  const [{ requestData }, setSate] = useState({
    requestData: null,
  });
  let paramsObj = {};
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (Object.keys(query)?.length > 0) {
      paramsObj = JSON.parse(query.params as string);
      searchService
        .search(paramsObj)
        .then((val) => {
          setSate({ requestData: val });
        })
        .finally(() => dispatch({ type: controlsConstants.HIDE_LOADER }));
      return () => {
        dispatch({ type: controlsConstants.SHOW_LOADER });
      };
    }
  }, [query]);

  function onToggleMobileAside() {
    setIsMobileMenuActive({
      ...isMobileMenuActive,
      main: !isMobileMenuActive.main,
    });
  }
  function onExitFromCategoryAside() {
    setIsMobileMenuActive({ main: false, chosenCategory: false });
  }
  function onToggleCategoryAside() {
    setIsMobileMenuActive({
      ...isMobileMenuActive,
      chosenCategory: !isMobileMenuActive.chosenCategory,
    });
  }

  return (
    <>
      <Head>
        <title>Результаты поиска по запросу | V16</title>
        <meta name="robots" content="noindex,nofollow"></meta>
        <meta
          name="description"
          content={`V16 - Результаты поиска по запросу: ${requestData?.config?.params?.text}`}
        ></meta>
        <meta name="keywords" content=""></meta>
      </Head>
      <MobileAside
        onToggleMainClick={onToggleMobileAside}
        onToggleCategory={onToggleCategoryAside}
        onChosenCategoryExitClick={onExitFromCategoryAside}
        isActive={isMobileMenuActive}
        products={requestData?.data.data}
      />
      {props.controls.isLoaderShown && <Loader />}

      <ProductsSortMenu
        products={requestData?.data.data}
        onFilterBtnClick={onToggleMobileAside}
        defaultSelectValue={"За рейтингом"}
        sortOptions={[
          "За рейтингом",
          "Від дорогих к дешевим",
          "Від дешевих к дорогим",
        ]}
      />

      <div
        style={{ flexDirection: "row" }}
        className={"wrapper-horizontal" + " global-width-limiter"}
      >
        <AsideMenu products={requestData?.data?.data} />
        {query.text && (
          <div className={style.searchTitle}>
            {trans('Результати пошуку за запитом')} {`<< ${query.text} >>`}
          </div>
        )}
        {/* <div className={'search__order'}>
          sort order
        </div> */}
        {requestData !== null && !requestData?.data?.count ? (
          <div className={style.nothingFound}>
            {trans('На жаль, за вашим запитом нічого не знайдено')}...
          </div>
        ) : (
          <div className={"search"}>
            {/* <div className={'search__filters'}>
              filters
            </div> */}
            <div className={"search__content"}>
              <SearchItems paginatedData={requestData?.data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps({ locale }) {
  return {
  props: await serverSideTranslations(locale, ['search','layout']),
  }
}
const connectedSearchPage = connect((state) => state)(SearchPage);
export default connectedSearchPage;

