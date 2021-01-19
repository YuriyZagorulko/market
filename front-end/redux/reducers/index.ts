import { combineReducers, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { userReducer as user } from './user.reducer'
import { authRerucer as auth } from './auth.reducer'
import { productReducer as product } from './product.reducer'

export const reducers = combineReducers({
  // reducer,
  user,
  auth,
  product
})
