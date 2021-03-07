import { Console } from 'console'
import { select, call, put, takeLatest } from 'redux-saga/effects'
import { LocalStorage } from '../../helpers/storage/localStorage'
import { ICartState } from '../reducers/cart.reducer'
import { IState } from '../store'

export const getCart = (state: IState) => state.cart
const storage: LocalStorage = LocalStorage.Instance

export function* saveCart(action) {
   try {
      const cart: ICartState = yield select(getCart)
      storage.saveCart(cart)
   } catch (error) {
      console.log(error)
   }
 }
// export function* watchUserLogin() {
//    debugger
//    yield takeLatest(userConstants.LOGIN_REQUEST, userLogin)
// }