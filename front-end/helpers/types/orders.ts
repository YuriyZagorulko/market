import { IProduct } from "./responces/products"

export type orderType = 'NEW_POST' | 'NEW_POST_CURRIER'

export interface IOrder{
    orderType: string
    recipientName: string
    recipientSecondName: string | any
    recipientSurname: string
    phoneNumber: string
    street: string
    city: string
    house: string
    officeRef: string
    officeDescription: string
    apartment: string
    details: {quantity: number, product: IProduct} []
}
