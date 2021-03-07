import { alertConstants } from '../../helpers/constants'

export const alertActions = {
    openCart,
    closeCart
}

function openCart() {
    return { type: alertConstants.SUCCESS}
}

function closeCart() {
    return { type: alertConstants.ERROR}
}