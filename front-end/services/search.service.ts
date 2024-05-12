import { debug } from "console"
import config from "../config"
import { mainAxios as axios } from "./axios"
import { IGlobalSearchState } from "../redux/slices/search.slice"

export const searchService = {
    search,
}

function search(params: IGlobalSearchState) {
    return axios.get(`${config.apiUrl}/market/search`, { params : {...params, ...params.pagination} })
}
