import { IUser } from './../../helpers/types/auth'
import { LocalStorage, storageKeys } from './../../helpers/storage/localStorage'
import { authConstants } from '../constants'

export interface IUserState {
    access: string
    refresh: string
    user: IUser
}

const storage: LocalStorage = LocalStorage.Instance
function initializeUser(): IUserState{
    const user = storage.initByKey(storageKeys.user)
    if (user) {
        return user
    }
    return {
        access: '',
        refresh: '',
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
            ...action.value,
            user: { ...action.value.user }
        }
    case authConstants.LOGOUT:
        return {
            items: action.users
        }
    default:
        return state
    }
}