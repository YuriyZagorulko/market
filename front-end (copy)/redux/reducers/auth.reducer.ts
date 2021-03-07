
import { userConstants } from '../../helpers/constants'

export interface IAuthState {
    isLoggedIn
}

export function authRerucer(state: IAuthState = {isLoggedIn: false}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user
        }
        case userConstants.LOGIN_SUCCESS:
            return {
            loggedIn: true,
            user: action.user
            }
        case userConstants.LOGIN_FAILURE:
            return {}
        case userConstants.LOGOUT:
            return {}
        default:
            return state
  }
}
