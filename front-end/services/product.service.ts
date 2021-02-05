import config from '../config'
import { store } from '../redux/store'
import { IMain } from '../helpers/types/responces/products'
export const productService = {
    mainPage
}

function mainPage() {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`${config.apiUrl}/market/main-page`, requestOptions)
        .then(handleResponse)
        .then((responce: IMain) => {
            console.log(responce)
            return responce.products
        })
}
function getProduct({id}) {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`${config.apiUrl}/market/product`, requestOptions)
        .then(handleResponse)
        .then((responce: IMain) => {
            console.log(responce)
            return responce.products
        })
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}