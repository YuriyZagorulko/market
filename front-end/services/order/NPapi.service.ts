import config from '../../config'

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
export const NPapiService = {
    getCities,
    getOfficess
}
function getCities(seatchStr: string): Promise<ICitiesResponce> {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {  'Content-Type': 'application/json'},
    }
    return fetch(`${config.apiUrl}/market/shipping/np/cities?cityName=${seatchStr}`, requestOptions)
        .then((responce) => {
            return responce.json().then(body => {
                if (body.content.data && body.content.data[0]){
                    return body.content.data[0]
                }
            })
        }).catch(e => {
            console.log(e)
            return e
        })
}
function getOfficess(cityRef: string): Promise<{ description: string, ref: string } []> {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {  'Content-Type': 'application/json'},
    }
    return fetch(`${config.apiUrl}/market/shipping/np/offices?selectedCity=${cityRef}`, requestOptions)
        .then((responce) => {
            return responce.json().then(body => {
                if (body.content){
                    return body.content
                }
                return []
            })
        }).catch(e => {
            console.log(e)
            return e
        })
}
