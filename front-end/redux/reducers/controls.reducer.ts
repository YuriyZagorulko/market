
import { controlsConstants } from '../../helpers/constants/controls'

export interface IControlsState{
    isCartOpened: boolean
}
const defaultState = {isCartOpened: false}
export function controlsReducer(state: IControlsState = defaultState, action) {
  switch (action.type) {
    case controlsConstants.OPEN_CART:
        return {
            isCartOpened: true
        }
    case controlsConstants.CLOSE_CART:
        return {
            isCartOpened: false
        }
        default:
            return state
  }
}
