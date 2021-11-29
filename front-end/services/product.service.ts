import config from '../config'
import { IMain, IProduct } from '../helpers/types/responces/products'
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
            console.log(responce)
            return responce.products
        })
}
function getProduct(id: string): Promise<IProduct> {
    if (id) {
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`${config.apiUrl}/market/product?productId=` + id, requestOptions)
        .then(handleResponse)
        .then((responce: {product: IProduct}) => {
            console.log(responce)
            return responce.product
        })
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