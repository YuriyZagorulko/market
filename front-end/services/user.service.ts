import { IUserLogin, IUserRegister } from './../helpers/types/auth';
import config from '../config'
import { authHeader } from '../helpers/headers'
import { LocalStorage } from '../helpers/storage/localStorage'
import { store } from '../redux/store'
import { ILogin } from '../helpers/types/responces/auth'
import { IUserState } from '../redux/reducers/user.reducer'
import { urlencodedBody } from './service.helpers';
import { handleRequestError } from '../helpers/interceptors';

const storage: LocalStorage = LocalStorage.Instance
export const userService = {
    login,
    logout,
    registerUser
}

function testSecureAction() {
    const user: IUserState = store.getState().user
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    'Authorization': 'Token ' + user.token },
        body: JSON.stringify({})
    }
    return fetch(`${config.apiUrl}/market/`, requestOptions)
        .then((responce) => {
            return responce.json()
        }).catch(e => {
            debugger
            return e
        })
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
    return fetch(`${config.apiUrl}/market/auth/register/`, requestOptions)
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
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}