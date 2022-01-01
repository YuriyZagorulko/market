import { combineReducers, AnyAction } from 'redux'
import { authReducer as auth } from './auth.reducer'
import { productReducer as product } from './product.reducer'
import { controlsReducer as controls } from './controls.reducer'
import { cartReducer as cart } from './cart.reducer'

export const reducers = combineReducers({
  auth,
  product,
  controls,
  cart
})
