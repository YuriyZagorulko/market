import Router from "next/router"

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

export function handleErrors(err) {
    if (err === 'Not Found') {
        Router.push("/404")
      }
    return err
}