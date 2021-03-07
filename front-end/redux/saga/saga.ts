import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { userConstants } from '../../helpers/constants/user.constants'
import { productConstants } from '../../helpers/constants/product.constants'
import { userLogin } from './users.saga'
import { getMainPageData } from './products.saga'
import { saveCart } from './cart.saga'
import { cartConstants } from '../reducers/cart.reducer'
function *watchAll() {
  yield all([
    takeLatest(userConstants.LOGIN_REQUEST, userLogin),
    takeLatest(productConstants.GETMAIN_REQUEST, getMainPageData),
    takeEvery(cartConstants.ADD_PRODUCT, saveCart),
    takeEvery(cartConstants.ADD_QUANTITY, saveCart),
    takeEvery(cartConstants.REMOVE_PRODUCT, saveCart)
    // takeEvery("CREATE_USER_REQUESTED", createUser)
  ])
}

export default watchAll