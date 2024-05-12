export interface IProductCategory{
    name: string
    name_UA: string
    parentCategory: number
    keyWord: string
    isRootCategory?: boolean
    image: string
    parentCategoryData?: IProductCategory
}