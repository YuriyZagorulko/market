import config from '../../config'
import { LocalStorage } from '../../helpers/storage/localStorage'
import { store } from '../../redux/store'
import { ILogin } from '../../helpers/types/responces/auth'
import { IUserState } from '../../redux/reducers/user.reducer'

export interface IArea {
    AddressDeliveryAllowed: boolean
    Area: string
    DeliveryCity: string
    MainDescription: string
    ParentRegionCode: string
    ParentRegionTypes: string
    Present: string
    Ref: string
    Region: string
    RegionTypes: string
    RegionTypesCode: string
    SettlementTypeCode: string
    StreetsAvailability: boolean
    Warehouses: number
}
export interface ICitiesResponce{
    Addresses: IArea []
    TotalCount: number
}
const storage: LocalStorage = LocalStorage.Instance
export const NPapiService = {
    getCities,
}
function getCities(seatchStr: string): Promise<ICitiesResponce> {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {  'Content-Type': 'application/json'},
        // body: JSON.stringify({
        //     cityName: seatchStr
        // })
    }
    return fetch(`${config.apiUrl}/market/shipping/np/cities?cityName=${seatchStr}`, requestOptions)
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