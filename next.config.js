const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    APP_API: (() => {
      // if (isDev) return 'http://localhost:1339'
      if (isDev) return 'https://strapi-kp.investmag.cz'
      if (isProd) return 'https://strapi-kp.investmag.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    APP_DOMAIN: (() => {
      if (isDev) return 'http://localhost:3005'
      if (isProd) return 'https://kralovska-pece.hardart.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    GP_CLIENT_ID: (() => {
      if (isDev) return '1436406037'
      if (isProd) return '1436406037'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    GP_SECRET_ID: (() => {
      if (isDev) return 'EJ2AVkDs'
      if (isProd) return 'EJ2AVkDs'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    PAY_API: (() => {
      if (isDev) return 'https://gw.sandbox.gopay.com'
      if (isProd) return 'https://gw.sandbox.gopay.com'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    SENDGRID_API_KEY: (() => {
      if (isDev) return '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'
      if (isProd) return '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'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_SEARCH_ONLY_API_KEY: (() => {
      if (isDev) return 'xyz'
      if (isProd) return 'asdfasdfasdf'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_HOST: (() => {
      if (isDev) return 'localhost'
      if (isProd) return 'strapi-kp.investmag.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_PORT: (() => {
      if (isDev) return '8108'
      if (isProd) return '443'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_PROTOCOL: (() => {
      if (isDev) return 'http'
      if (isProd) return 'https'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })()
  }

  const images = {
    domains: ['localhost', 'strapi-kp.investmag.cz'],
    deviceSizes: [320, 360, 640, 960, 1200, 1920, 2048],
  }

  // next.config.js object
  return {
    env,
    images
  }
}
