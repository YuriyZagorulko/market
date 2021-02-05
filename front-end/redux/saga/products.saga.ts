import { call, put, takeLatest } from 'redux-saga/effects'
import { productConstants } from '../../helpers/constants/product.constants'
import { productService } from '../../services/product.service'
export function* getMainPageData(action) {
    try {
       const data = yield call(productService.mainPage)
       yield put({type: productConstants.GETMAIN_SUCCESS, data})
    } catch (error) {
       yield put({type: productConstants.GETMAIN_FAILURE, error})
    }
  }