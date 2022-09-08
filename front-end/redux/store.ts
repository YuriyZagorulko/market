import {createStore, applyMiddleware, Store} from 'redux'
// import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import { reducers } from '../redux/reducers'
import watchAll from './saga/saga'
import createSagaMiddleware from 'redux-saga'
import { IUserState } from './reducers/auth.reducer'
import { IControlsState } from './reducers/controls.reducer'
import { ICartState } from './reducers/cart.reducer'
import { configureStore } from '@reduxjs/toolkit'
export interface IState{
    auth: IUserState
    cart: ICartState
    controls: IControlsState
}
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleWare) => {
      return getDefaultMiddleWare({ thunk: false }).concat(middleware)
    },
    devTools: true
})
sagaMiddleware.run(watchAll)
