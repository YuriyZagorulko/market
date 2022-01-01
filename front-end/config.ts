interface Config {
    domain: string
    apiUrl: string
    NPapi: string
}
const prod: Config = {
    domain: 'http://localhost:3000',
    apiUrl: '',
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
const dev: Config = {
    domain: 'http://localhost:3000',
    apiUrl: 'http://0.0.0.0:8000',
    NPapi: 'https://api.novaposhta.ua/v2.0/json/'
}
const currentConfig = dev
export default currentConfig