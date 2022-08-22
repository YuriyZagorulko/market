interface Config {
    mainDomain: string
    domain: string
    apiUrl: string
    NPapi: string
}
const prodDomain = 'https://v16.com.ua'
const localDomain = 'http://localhost:8000'

const prod: Config = {
    mainDomain: prodDomain,
    domain: prodDomain,
    apiUrl: `${prodDomain}/api`,
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
const dev: Config = {
    mainDomain: localDomain,
    domain: 'http://localhost:3000',
    apiUrl: 'http://0.0.0.0:8000/api',
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
let currentConfig = dev
const env = process.env.NODE_ENV
if (env === "production") {
    currentConfig = prod
}

export default currentConfig