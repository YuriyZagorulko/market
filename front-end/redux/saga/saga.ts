import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { productConstants } from '../../helpers/constants/product.constants'
import { getMainPageData } from './products.saga'
import { saveCart } from './cart.saga'
import { cartConstants } from '../reducers/cart.reducer'
function *watchAll() {
  yield all([
    // takeLatest(productConstants.GETMAIN_REQUEST, getMainPageData),
    takeEvery(cartConstants.ADD_PRODUCT, saveCart),
    takeEvery(cartConstants.CHANGE_QUANTITY, saveCart),
    takeEvery(cartConstants.REMOVE_PRODUCT, saveCart)
    // takeEvery("CREATE_USER_REQUESTED", createUser)
  ])
}

export default watchAll