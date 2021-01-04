interface Config {
    domain: string
    apiUrl: string
}
const prod: Config = {
    domain: 'http://localhost:3000',
    apiUrl: ''
}
const dev: Config = {
    domain: 'http://localhost:3000',
    apiUrl: 'http://0.0.0.0:8000'
}
const currentConfig = dev
export default currentConfig