import { alertConstants } from '../../helpers/constants'
import { controlsConstants } from '../../helpers/constants/controls'

export const controlActions = {
    openCart,
    closeCart,
    stopLoader,
    startLoader,
}

function openCart() {
    return { type: alertConstants.SUCCESS}
}

function closeCart() {
    return { type: alertConstants.ERROR}
}

function startLoader() {
    return { type: controlsConstants.SHOW_LOADER }
}

function stopLoader() {
    return { type: controlsConstants.HIDE_LOADER }
}