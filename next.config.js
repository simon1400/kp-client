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
      if (isDev) return 'https://strapi.kralovska-pece.cz'
      if (isProd) return 'https://strapi.kralovska-pece.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    APP_DOMAIN: (() => {
      if (isDev) return 'http://localhost:3005'
      if (isProd) return 'https://kralovska-pece.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    GP_CLIENT_ID: (() => {
      if (isDev) return '1436406037'
      if (isProd) return '1436406037'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    GP_GO_ID: (() => {
      if (isDev) return '8815516765'
      if (isProd) return '8815516765'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    GP_SECRET_ID: (() => {
      if (isDev) return 'EJ2AVkDs'
      if (isProd) return 'EJ2AVkDs'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    PAY_API: (() => {
      if (isDev) return 'https://gw.sandbox.gopay.com'
      // if (isDev) return 'https://gate.gopay.cz'
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
      if (isProd) return 'sdfgsdfgsdfgfsdg'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_HOST: (() => {
      if (isDev) return 'localhost'
      if (isProd) return 'kp-search.hardart.cz'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_PORT: (() => {
      if (isDev) return '8109'
      if (isProd) return '443'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    TYPESENSE_PROTOCOL: (() => {
      if (isDev) return 'http'
      if (isProd) return 'https'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })()
  }

  // next.config.js object
  return {
    env
  }
}
