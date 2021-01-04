import {createStore, applyMiddleware, Store} from 'redux'
// import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import { reducers } from '../redux/reducers'
import thunk from 'redux-thunk'
import { IUserState } from './reducers/user.reducer'
import { IAuthState } from './reducers/auth.reducer'
export interface IState{
    user: IUserState
    auth: IAuthState
}

const bindMiddleware = (middleware) => {
    const applyedMiddlewares = applyMiddleware(...middleware)
    if (process.env.NODE_ENV !== 'production') {
        // tslint:disable-next-line: no-implicit-dependencies
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyedMiddlewares
}

// // create a makeStore function
// const makeStore: MakeStore = (context: Context) => createStore(reducers, bindMiddleware([thunk]))

// // export an assembled wrapper
// export const wrapper = createWrapper(makeStore, {debug: true})

export const store: Store<IState> =  createStore(reducers, bindMiddleware([thunk]))