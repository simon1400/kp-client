const AxiosPAY = require('../restClient').default

const GetAccessToken = async () => {
  var base64Access = Buffer.from(`${process.env.GP_CLIENT_ID}:${process.env.GP_SECRET_ID}`).toString('base64')

  const params = new URLSearchParams()
  params.append('scope', 'payment-create')
  params.append('grant_type', 'client_credentials')

  const resAuthTokens = await AxiosPAY.post('/api/oauth2/token', params, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${base64Access}`,
    }
  })

  return resAuthTokens.data.access_token
}

export default GetAccessToken
