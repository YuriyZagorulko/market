import { combineReducers, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { userReducer as user } from './user.reducer'
import { authRerucer as auth } from './auth.reducer'

// // create your reducer
// const reducer = (state: State = {testValue: 'default value'}, action: AnyAction) => {
//   switch (action.type) {
//       case HYDRATE:
//           // Attention! This will overwrite client state! Real apps should use proper reconciliation.
//           return {...state, ...action.payload}
//       default:
//           return state
//   }
// }

export const reducers = combineReducers({
  // reducer,
  user,
  auth
})
