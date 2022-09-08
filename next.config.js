const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {

  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`)

  return {
    env: {
      APP_API: process.env.APP_API,
      APP_DOMAIN: process.env.APP_DOMAIN,
      GP_CLIENT_ID: process.env.GP_CLIENT_ID,
      GP_GO_ID: process.env.GP_GO_ID,
      GP_SECRET_ID: process.env.GP_SECRET_ID,
      PAY_API: process.env.PAY_API,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    }
  }
}
