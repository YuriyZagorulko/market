import { call, put, takeLatest } from 'redux-saga/effects'
import { userConstants } from '../../helpers/constants'
import  {userService}  from '../../services/user.service'
export function* userLogin(action) {
   try {
      const data = yield call(userService.login, action.payload)
      yield put({type: "LOGIN_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
 }
// export function* watchUserLogin() {
//    debugger
//    yield takeLatest(userConstants.LOGIN_REQUEST, userLogin)
// }