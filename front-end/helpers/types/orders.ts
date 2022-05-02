export type orderType = 'NEW_POST' | 'NEW_POST_CURRIER'

export interface IOrder{
    apartment: string
    city: string
    created_at: Date | string
    house: string
    id: number
    officeDescription: string
    officeRef: string
    orderType: orderType
    phoneNumber: string
    recipientName: string
    recipientSecondName: string
    recipientSurname: string
    street: string
    updated_at: string
    user: number
}