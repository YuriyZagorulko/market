import config from '../config'
import { IMain, IProduct } from '../helpers/types/responces/products'
import { handleErrors } from './service.helpers'
export const productService = {
    mainPage,
    getProduct
}

function mainPage() {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`${config.apiUrl}/market/main-page`, requestOptions)
        .then(handleResponse)
        .then((responce: IMain) => {
            return responce
        })
}
function getProduct(url: string): Promise<IProduct> {
    if (url) {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`${config.apiUrl}/market/product?productUrl=` + url, requestOptions)
        .then(handleResponse)
        .then((responce: {product: IProduct}) => {
            return responce.product
        }).catch(handleErrors)
    }
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