import config from '../config'
import { IMain, IProduct } from '../helpers/types/responces/products'
import { handleErrors } from './service.helpers'
export const productService = {
    getOrders
}

function getOrders(): Promise<IProduct> {

    return fetch(`${config.apiUrl}/market/user/orders`)
        .then(handleResponse)
        .then((responce) => {
            return responce.data
        }).catch(handleErrors)
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