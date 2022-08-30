import config from "../../../config"

export interface IMain{
    products: []
}
export interface IImage {
    id: number,
    name: string,
    image: string,
    default: boolean,
    width: number,
    length: number,
    album: number
}
export interface IProduct {
    id: number,
    title: string,
    price: number,
    description: string,
    images: number,
    created_at: string,
    updated_at: string,
    url?: string,
    characteristics?: any,
    imagesSet: IImage [],
}
export interface AddedProduct{
    product: IProduct
    quantity: number
}
export function getFirstImg(product: IProduct): string{
    if (product && product.imagesSet && product.imagesSet.length > 0) {
        return product.imagesSet[0].image
    }
    return ''
}
export function getProductImg(product: IProduct): string{
    return config.mainDomain + getFirstImg(product)
}
export function getPreviewImgUrl(product: IProduct): string {
    if (product?.imagesSet?.length > 0) {
        return config.mainDomain + getFirstImg(product)
    }
    return '/images/icons/shared/product-default.svg'
}