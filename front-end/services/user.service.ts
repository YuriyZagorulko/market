import { IUserLogin, IUserRegister } from './../helpers/types/auth';
import config from '../config'
import { authHeader } from '../helpers/headers'
import { LocalStorage } from '../helpers/storage/localStorage'
import { store } from '../redux/store'
import { ILogin } from '../helpers/types/responces/auth'
import { urlencodedBody } from './service.helpers'
import { handleRequestError } from '../helpers/interceptors'

const storage: LocalStorage = LocalStorage.Instance
export const userService = {
    login,
    logout,
    registerUser
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function registerUser(user: IUserRegister) {
    user.birthday = new Date(user.birthday).toISOString().slice(0, 10)
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlencodedBody({
            ...user,
            'confirm_password': user.confirmPassword,
            'second_name': user.secondName,
            'last_name': user.lastName,
        })
    }
    return fetch(`${config.apiUrl}/auth/register/`, requestOptions)
        .then((responce) => {
            return responce.json()
        }).catch(handleRequestError)
}
function login(user: IUserLogin) {
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlencodedBody({
            ...user,
        })
    }
    return fetch(`${config.apiUrl}/auth/login/`, requestOptions)
        .then((responce) => {
            return responce.json()
        }).catch(handleRequestError)
}
