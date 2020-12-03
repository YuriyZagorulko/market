import { userConstants } from '../../constants'
import { userService } from '../../services/user.service'

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }))

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user))
                },
                error => {
                    dispatch(failure(error))
                    // tslint:disable-next-line: no-console
                    console.log(error)
                }
            )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout()
    return { type: userConstants.LOGOUT }
}
