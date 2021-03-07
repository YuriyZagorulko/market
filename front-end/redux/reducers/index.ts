import { combineReducers, AnyAction } from 'redux'
import { userReducer as user } from './user.reducer'
import { authRerucer as auth } from './auth.reducer'
import { productReducer as product } from './product.reducer'
import { controlsReducer as controls } from './controls.reducer'
import { cartReducer as cart } from './cart.reducer'

export const reducers = combineReducers({
  // reducer,
  user,
  auth,
  product,
  controls,
  cart
})
