export function urlencodedBody(obj) {
    const formBody = []
    for (const property in obj) {
        if (obj[property]) {
            const encodedKey = encodeURIComponent(property)
            const encodedValue = encodeURIComponent(obj[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }
    }
    return formBody.join("&")
}