import { cartConstants } from "../reducers/cart.reducer"

export const clearCart = () => {
    return { type: cartConstants.CLEAR_CART }
}