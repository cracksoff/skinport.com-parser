const { clientId, clientSecret } = process.env
const encodedData = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
export const authorizationHeaderString = `Authorization: Basic ${encodedData}`
export const URL = 'https://api.skinport.com/v1/items'
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
