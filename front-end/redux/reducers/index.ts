import { combineReducers, AnyAction } from 'redux'
import {HYDRATE} from 'next-redux-wrapper'
import users from './users.reducer'
export interface State {
  tick: string
}
// create your reducer
const reducer = (state: State = {tick: 'init'}, action: AnyAction) => {
  switch (action.type) {
      case HYDRATE:
          // Attention! This will overwrite client state! Real apps should use proper reconciliation.
          return {...state, ...action.payload}
      case 'TICK':
          return {...state, tick: action.payload}
      default:
          return state
  }
}

export const reducers =  combineReducers({
  reducer,
  users
})
