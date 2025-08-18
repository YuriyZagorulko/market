import config from '../config'
import { IProduct } from '../helpers/types/responces/products'
import { mainAxios } from './axios'

export const productService = {
    getOrders
}

function getOrders(): Promise<IProduct> {

    return mainAxios.get(`${config.apiUrl}/market/user/orders`)
        .then((responce) => {
            return responce.data
        })
}