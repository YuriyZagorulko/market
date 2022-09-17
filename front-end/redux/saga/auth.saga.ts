import { IUserState } from './../reducers/auth.reducer'
import { LocalStorage, storageKeys } from './../../helpers/storage/localStorage'
import { IState } from './../store'
import { call, put, select, takeLatest } from 'redux-saga/effects'

export const getAuthState = (state: IState) => state.auth
const storage: LocalStorage = LocalStorage.Instance

export function* saveUser(action) {
   try {
      const auth: IUserState = yield select(getAuthState)
      storage.saveByKey(auth, storageKeys.user)
   } catch (error) {
      console.log(error)
   }
}
export function* removeUser() {
   try {
      storage.saveByKey(null, storageKeys.user)
   } catch (error) {
      console.log(error)
   }
}
// export function* watchUserLogin() {
//    debugger
//    yield takeLatest(userConstants.LOGIN_REQUEST, userLogin)
// }