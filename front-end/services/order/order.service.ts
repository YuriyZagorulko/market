import { AxiosPromise } from 'axios'
import config from '../../config'
import { IResponse } from '../../helpers/types/responces'
import { IJustinData, INewPostCourierData, INewPostData, IShipping } from '../../helpers/types/shipping'
import { mainAxios as axios, mainAxios } from '../axios'

export interface IOrderData {
    name: string,
    surname: string,
    secondName: string,
    phone: string,
    productList: {id: number, quantity: number} [],
    shipping: IShipping< INewPostData | INewPostCourierData | IJustinData >
}

export const OrderService = {
    confirmOrder,
    getOrders
}
function confirmOrder(data: IOrderData): AxiosPromise<IResponse> {
    return axios.post(`${config.apiUrl}/market/shipping/confirm-order`, data) .then((responce) => {
        return responce.data
    }).catch(e => {
        return e
    })
}

function getOrders(){
    return axios.get(`${config.apiUrl}/market/user/orders`)
}