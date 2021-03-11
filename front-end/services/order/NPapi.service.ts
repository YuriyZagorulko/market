import config from '../../config'
import { LocalStorage } from '../../helpers/storage/localStorage'
import { store } from '../../redux/store'
import { ILogin } from '../../helpers/types/responces/auth'
import { IUserState } from '../../redux/reducers/user.reducer'

const storage: LocalStorage = LocalStorage.Instance
export const NPapiService = {
    getCities,
}
function getCities(seatchStr: string) {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json'},
        body: JSON.stringify({
            "apiKey": "89a5486c659b94aa979a9d16ef74d638",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                    "CityName": "київ",
                    "Limit": 5
                }
            })
    }
    return fetch(`${config.NPapi}/Address/searchSettlements/`, requestOptions)
        .then((responce) => {
            responce.json().then(body => console.log(body))
        }).catch(e => {
            debugger
            return e
        })
}