import { debug } from "console"
import config from "../config"
import { mainAxios as axios } from "./axios"

export const searchService = {
    search,
}
export interface ISearchParams{
    text?: string
    priceRange?: { from: number, to: number }
    category?: string
}

function search(params) {
    return axios.get(`${config.apiUrl}/market/search`, { params })
}