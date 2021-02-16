
import { controlsConstants } from '../../helpers/constants/controls'

export interface IControls{
    isCartOpened: boolean
}

export function controlsReducer(state: IControls = {isCartOpened: false}, action) {
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
