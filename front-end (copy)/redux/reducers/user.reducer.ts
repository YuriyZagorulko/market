import { UV_FS_O_FILEMAP } from 'constants'
import { userConstants } from '../../helpers/constants'
import { LocalStorage } from '../../helpers/storage/localStorage'

const storage: LocalStorage = LocalStorage.Instance
function initializeUser(): IUserState{
    const user = storage.user
    if (user) {
        return user
    }
    return {
        token: ''
    }
}

export interface IUserState {
    token: string
}
export function userReducer(
    state: IUserState = initializeUser(),
    action
) {
    switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
            loading: true
        }
    case userConstants.GETALL_SUCCESS:
        return {
            items: action.users
        }
    case userConstants.GETALL_FAILURE:
        return {
            error: action.error
        }
    default:
        return state
    }
}