import { authConstants } from '../constants'
import { userService } from '../../services/user.service'

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return (dispatch) => {
        userService.login({ email: username, password }).then(
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
}

export function logout() {
    return { type: authConstants.LOGOUT }
}
