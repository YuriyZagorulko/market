
import { controlsConstants } from '../../helpers/constants/controls'

export interface IControlsState {
    isCartOpened: boolean
    isExitDialogOpened: boolean
    isLoaderShown: boolean
}
const defaultState = { isCartOpened: false, isExitDialogOpened: false, isLoaderShown: true }
export function controlsReducer(state: IControlsState = defaultState, action) {
    switch (action.type) {
        case controlsConstants.OPEN_CART:
            return {
                ...state,
                isCartOpened: true
            }
        case controlsConstants.CLOSE_CART:
            return {
                ...state,
                isCartOpened: false
            }
        case controlsConstants.OPEN_EXIT_DIALOG:
            return {
                ...state,
                isExitDialogOpened: true
            }
        case controlsConstants.CLOSE_EXIT_DIALOG:
            return {
                ...state,
                isExitDialogOpened: false
            }
        case controlsConstants.SHOW_LOADER:
            return {
                ...state,
                isLoaderShown: true
            }
        case controlsConstants.HIDE_LOADER:
            return {
                ...state,
                isLoaderShown: false
            }
        default:
            return state
    }
}
