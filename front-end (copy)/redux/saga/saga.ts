import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { userConstants } from '../../helpers/constants/user.constants'
import { productConstants } from '../../helpers/constants/product.constants'
import { userLogin } from './users.saga'
import { getMainPageData } from './products.saga'
function *watchAll() {
  yield all([
    takeLatest(userConstants.LOGIN_REQUEST, userLogin),
    takeLatest(productConstants.GETMAIN_REQUEST, getMainPageData)
    // takeEvery("CREATE_USER_REQUESTED", createUser)
  ])
}

export default watchAll