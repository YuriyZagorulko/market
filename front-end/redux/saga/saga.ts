import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { productConstants } from '../../helpers/constants/product.constants'
import { getMainPageData } from './products.saga'
import { saveCart } from './cart.saga'
import { cartConstants } from '../reducers/cart.reducer'
import { authConstants } from '../constants'
import { removeUser, saveUser } from './auth.saga'

function *watchAll() {
  yield all([
    // save states
    takeEvery(authConstants.LOGIN_SUCCESS, saveUser),
    takeEvery(authConstants.LOGOUT, removeUser),
    takeEvery(cartConstants.ADD_PRODUCT, saveCart),
    takeEvery(cartConstants.CHANGE_QUANTITY, saveCart),
    takeEvery(cartConstants.REMOVE_PRODUCT, saveCart),
    takeEvery(cartConstants.CLEAR_CART, saveCart)
    // takeLatest("CREATE_USER_REQUESTED", createUser)
  ])
}

export default watchAll