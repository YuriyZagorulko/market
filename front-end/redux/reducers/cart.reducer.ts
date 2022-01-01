
import { LocalStorage } from '../../helpers/storage/localStorage'
import { AddedProduct, IProduct } from '../../helpers/types/responces/products'
import { IProductState } from './product.reducer'

export const cartConstants = {
    ADD_PRODUCT: 'ADD_PRODUCT',
    CHANGE_QUANTITY: 'CHANGE_PRODUCT_QUANTITY',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
}
const storage: LocalStorage = LocalStorage.Instance
export interface ICartState {
    addedProducts: AddedProduct []
}

export function cartReducer(state: ICartState = storage.initCart(), action) {
  switch (action.type) {
    case cartConstants.ADD_PRODUCT:
        return addProduct(state, action)
    case cartConstants.REMOVE_PRODUCT:
        return removeProduct(state, action)
    case cartConstants.CHANGE_QUANTITY:
        return changeQuantity(state, action)
    default:
        return state
  }
}
export function getTotalPrice(state: ICartState): number {
    let price = 0
    for (const item of state.addedProducts){
        price += item.quantity * item.product.price
    }
    return price
}
export function getProductIndex(state: ICartState, productId): number {
    let index = -1
    for (let i = 0; i < state.addedProducts.length; i++){
        if (productId === state.addedProducts[i].product.id){
            index = i
        }
    }
    return index
}
function changeQuantity(state: ICartState, action): ICartState{
    const product: IProduct = action.product
    const newQuantity: number = action.quantity
    const productIndex = getProductIndex(state, product.id)
    if (productIndex > -1){
        state.addedProducts[productIndex].quantity = newQuantity
        return state
    } else{
        // tslint:disable-next-line: no-console
        console.error('changing quantity of unexisting product')
        return state
    }
}
function addProduct(state: ICartState, action): ICartState {
    const product: IProduct = action.product
    const addNumber = action.number ? action.number : 1
    const productIndex = getProductIndex(state, product.id)
    if (!(productIndex > -1)){ // if no product with same id added to the cart
        return {
            addedProducts: [...state.addedProducts,
                { product, quantity: addNumber}]
        }
    } else{
        // tslint:disable-next-line: no-console
        console.error('adding existing product!!!')
        return state
    }
}
function removeProduct(state: ICartState, action): ICartState {
    const product: IProduct = action.product
    const productIndex = getProductIndex(state, product.id)
    if (productIndex > -1){
        state.addedProducts.splice(productIndex, 1)
        return state
    } else{
        // tslint:disable-next-line: no-console
        console.error('deleting unexisting product')
        return state
    }
}