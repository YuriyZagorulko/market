import { productService } from '../../services/product.service'

export const productActions = {
    mainPage
}

function mainPage() {
        productService.mainPage().then(
            (data) => {
                console.log(data)
            }
        ).catch((err) => {
            console.log(err)
        })
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