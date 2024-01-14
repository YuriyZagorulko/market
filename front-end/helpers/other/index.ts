import { NextRouter } from "next/router"
import { IProductCategory } from "../types"

export function sleeper(ms) {
  return (x) => {
    return new Promise(resolve => setTimeout(() => resolve(x), ms))
  }
}

export const redirectToCategory = (category: IProductCategory, router: NextRouter) => () => {
  if (category) {
    router.push({
        pathname: '/search',
        query: {search_params: JSON.stringify({ category: category.keyWord })}
    })
  }
}