import config from '../../config'
import { IResponse } from '../../helpers/types/responces'
import { IJustinData, INewPostCourierData, INewPostData, IShipping } from '../../helpers/types/shipping'
import { mainAxios as axios } from '../axios'

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
function confirmOrder(data: IOrderData): Promise<IResponse> {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    return fetch(`${config.apiUrl}/market/shipping/confirm-order`, requestOptions)
        .then((responce) => {
            return responce.json().then(body => {
                if (body.content.data && body.content.data[0]){
                    return body.content.data[0]
                }
            })
        }).catch(e => {
            return e
        })
}
function getOrders(){
    return axios.get(`${config.apiUrl}/market/user/orders`)
}