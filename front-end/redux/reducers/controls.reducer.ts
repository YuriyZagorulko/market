
import { controlsConstants } from '../../helpers/constants/controls'

export interface IControlsState{
    isCartOpened: boolean
    isExitDialogOpened: boolean
}
const defaultState = {isCartOpened: false, isExitDialogOpened:false}
export function controlsReducer(state: IControlsState = defaultState, action) {
  switch (action.type) {
    case controlsConstants.OPEN_CART:
        return { ...state,
            isCartOpened: true
        }
    case controlsConstants.CLOSE_CART:
        return { ...state,
            isCartOpened: false
        }
    case controlsConstants.OPEN_EXIT_DIALOG:
        return{ ...state,
                isExitDialogOpened:true
        }
    case controlsConstants.CLOSE_EXIT_DIALOG:
        return{ ...state,
            isExitDialogOpened:false
        }
        
        default:
            return state
  }
}
