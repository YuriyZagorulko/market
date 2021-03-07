
import { userConstants } from '../../helpers/constants'
import { productConstants } from '../../helpers/constants/product.constants'
import { IProduct } from '../../helpers/types/responces/products'

export interface IProductState {
    mainPage: IProduct []
}

export function productReducer(state: IProductState = { mainPage: []}, action) {
  switch (action.type) {
    case productConstants.GETMAIN_REQUEST:
        return {
            mainPage: [],
        }
        case productConstants.GETMAIN_SUCCESS:
            return {
                mainPage: action.data
            }
        case productConstants.GETMAIN_FAILURE:
            return {}
        default:
            return state
  }
}
