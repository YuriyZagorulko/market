import { IUser } from './../../helpers/types/auth'
import { LocalStorage } from './../../helpers/storage/localStorage'

import { userConstants } from '../constants'

export interface IAuthState {
    isLoggedIn
}

const storage: LocalStorage = LocalStorage.Instance
function initializeUser(): IUserState{
    const user = storage.user
    if (user) {
        return user
    }
    return {
        token: '',
        refreshToken: '',
        user: null
    }
}

export interface IUserState {
    token: string
    refreshToken: string
    user: IUser
}
export function authReducer(
    state: IUserState = initializeUser(),
    action
) {
    switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
        return {
            loading: true
        }
    case userConstants.LOGOUT:
        return {
            items: action.users
        }
    default:
        return state
    }
}