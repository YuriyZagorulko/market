import { IUser } from './../../helpers/types/auth'
import { LocalStorage, storageKeys } from './../../helpers/storage/localStorage'
import { authConstants } from '../constants'

export interface IUserState {
    token: string
    user: IUser
}

const storage: LocalStorage = LocalStorage.Instance
function initializeUser(): IUserState{
    const user = storage.initByKey(storageKeys.user)
    if (user) {
        return user
    }
    return {
        token: '',
        user: null
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
            token: { ...action.value.token }
        }
    case authConstants.LOGOUT:
        return {
            ...state,
            user: null,
            token: null
        }
    default:
        return state
    }
}