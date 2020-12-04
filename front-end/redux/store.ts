import {createStore, applyMiddleware} from 'redux'
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import {State, reducers} from '../redux/reducers'
import createSagaMiddleware from 'redux-saga'
import watchAll from './saga/saga'

const sagaMiddleware = createSagaMiddleware()
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        // tslint:disable-next-line: no-implicit-dependencies
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    const applyedMiddlewares = applyMiddleware(...middleware)
    sagaMiddleware.run(watchAll)
    return applyedMiddlewares
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>  createStore(reducers, bindMiddleware([sagaMiddleware]))

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, {debug: true})