import config from '../config'
import { IMain, IProduct } from '../helpers/types/responces/products'
import { mainAxios } from './axios'
import { handleErrors } from './service.helpers'
export const productService = {
    mainPage,
    getProduct
}

function mainPage() {
    return mainAxios.get(`${config.apiUrl}/market/main-page`)
    .then((res) => res?.data)
}
function getProduct(url: string): Promise<IProduct> {
    if (url) {

    return mainAxios.get(`${config.apiUrl}/market/product?productUrl=` + url)
        .then((res) => res?.data?.product)
    }
}