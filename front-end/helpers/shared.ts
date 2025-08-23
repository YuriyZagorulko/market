import config from "../config"

export function getImgUrl(imgUrl: string): string{
    return config.mainDomain + imgUrl;
}