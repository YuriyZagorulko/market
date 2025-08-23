import { mainAxios } from './axios'
import config from '../config'

export const categoryService = {
  getCategoryDetail
}

function getCategoryDetail(categoryKey: string | number) {
  return mainAxios.get(`${config.apiUrl}/market/category-detail`, { params: { categoryKey } })
    .then(res => res.data)
}
