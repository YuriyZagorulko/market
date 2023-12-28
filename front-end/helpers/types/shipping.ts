import { deliveryTypes } from "../order/order.constants"

export interface IShipping<DATA>{
    type: deliveryTypes
    data: DATA
}
export interface INewPostData{
    selectedCity: { value: string, cityRef: string }
    selectedOffice: { description: string, ref: string }
}
export interface INewPostCourierData{
    
}
export interface IJustinData{
    
}