interface Config {
    domain: string
    apiUrl: string
}
const prod: Config = {
    domain: 'http://localhost:3000/',
    apiUrl: ''
}
const dev: Config = {
    domain: 'http://localhost:3000/',
    apiUrl: ''
}
const currentConfig = dev
export default currentConfig