import { authConstants } from '../constants'
import { userService } from '../../services/user.service'

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return (dispatch) => {
        userService.login({ username, password }).then(
            (data) => {
                console.log(data)
            }
        ).catch((err) => {
            console.log(err)
        })
    }
    // return dispatch => {
    //     userService.login({ username, password })
    //         .then(
    //             user => {
    //                 dispatch(success(user))
    //             },
    //             error => {
    //                 dispatch(failure(error))
    //                 // tslint:disable-next-line: no-console
    //                 console.log(error)
    //             }
    //         )
    // }

    function request() { return { type: authConstants.LOGIN_REQUEST, payload: { username, password }} }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout()
    return { type: authConstants.LOGOUT }
}
