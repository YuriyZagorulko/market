import {createStore, AnyAction} from 'redux'
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import {State, reducers} from '../redux/reducers'



// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => createStore(reducers)

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, {debug: true})  