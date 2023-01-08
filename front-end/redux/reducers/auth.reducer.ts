import { IUser } from './../../helpers/types/auth'
import { LocalStorage, storageKeys } from './../../helpers/storage/localStorage'
import { authConstants } from '../constants'

export interface IUserState {
    token: string
    user: IUser
    restorePasswordToken:string
}

const storage: LocalStorage = LocalStorage.Instance
function initializeUser(): IUserState{
    const user = storage.initByKey(storageKeys.user)
    if (user) {
        return user
    }
    return {
        token: '',
        user: null,
        restorePasswordToken:'12312'
    }
}

export function authReducer(
    state: IUserState = initializeUser(),
    action
) {
    switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
        return {
            ...state,
            user: { ...action.value.user },
            token: action.value.token
        }
    case authConstants.LOGOUT:
        return {
            ...state,
            user: null,
            token: null
        }
    case authConstants.GET_RESTORE_PASSWORD_TOKEN_SUCCES:
        return {
            ...state,
            restorePasswordToken:action.value.token
        }
    default:
        return state
    }
}