import config from '../../config'
import { IResponse } from '../../helpers/types/responces'
import { IJustinData, INewPostCourierData, INewPostData, IShipping } from '../../helpers/types/shipping'

export interface IOrderData {
    name: string,
    surname: string,
    secondName: string,
    phone: string,
    priductList: number [],
    shipping: IShipping< INewPostData | INewPostCourierData | IJustinData >
}

export const OrderService = {
    confirmOrder,
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
                console.log(body)
                if (body.content.data && body.content.data[0]){
                    return body.content.data[0]
                }
            })
        }).catch(e => {
            debugger
            return e
        })
}