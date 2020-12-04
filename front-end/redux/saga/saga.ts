import { takeEvery, all } from 'redux-saga/effects'
import { userConstants } from '../../helpers/constants/user.constants'
import { userLogin } from './users.saga'
function *watchAll() {
  yield all([
    takeEvery(userConstants.LOGIN_REQUEST, userLogin),
    // takeEvery("CREATE_USER_REQUESTED", createUser)
  ])
}

export default watchAll