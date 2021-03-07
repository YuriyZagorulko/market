import {createStore, applyMiddleware, Store} from 'redux'
// import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import { reducers } from '../redux/reducers'
import watchAll from './saga/saga'
import createSagaMiddleware from 'redux-saga'
import { IUserState } from './reducers/user.reducer'
import { IAuthState } from './reducers/auth.reducer'
import { IProductState } from './reducers/product.reducer'
import { IControlsState } from './reducers/controls.reducer'
import { ICartState } from './reducers/cart.reducer'
export interface IState{
    user: IUserState
    auth: IAuthState
    product: IProductState
    cart: ICartState
    controls: IControlsState
}

const sagaMiddleware = createSagaMiddleware()
const bindMiddleware = (middleware) => {
    const applyedMiddlewares = applyMiddleware(...middleware)
    if (process.env.NODE_ENV !== 'production') {
        // tslint:disable-next-line: no-implicit-dependencies
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyedMiddlewares
}

// export const store: Store<IState> =  createStore(reducers, bindMiddleware([thunk]))
export const store: Store<IState> =  createStore(reducers, bindMiddleware([sagaMiddleware]))
sagaMiddleware.run(watchAll)