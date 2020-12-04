import { combineReducers, AnyAction } from 'redux'
import {HYDRATE} from 'next-redux-wrapper'
import users from './users.reducer'

export interface State {
  testValue: string
}
// create your reducer
const reducer = (state: State = {testValue: 'default value'}, action: AnyAction) => {
  switch (action.type) {
      case HYDRATE:
          // Attention! This will overwrite client state! Real apps should use proper reconciliation.
          return {...state, ...action.payload}
      default:
          return state
  }
}

export const reducers =  combineReducers({
  reducer,
  users
})
