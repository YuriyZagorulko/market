interface Config {
    domain: string
    apiUrl: string
    NPapi: string
}
const prodDomain = 'https://v16.com.ua'


const prod: Config = {
    domain: prodDomain,
    apiUrl: `${prodDomain}/api`,
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
const dev: Config = {
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