interface Config {
    domain: string
    apiUrl: string
    NPapi: string
}
const prodDomain = 'https://ec2-35-176-196-9.eu-west-2.compute.amazonaws.com'

const prod: Config = {
    domain: prodDomain,
    apiUrl: `${prodDomain}/api`,
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
const dev: Config = {
    domain: 'http://localhost:3000',
    apiUrl: 'http://0.0.0.0:8000',
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
let currentConfig = dev
const env = process.env.NODE_ENV
if (env === "production") {
    currentConfig = prod
}

export default currentConfig