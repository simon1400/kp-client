module.exports = {
  apps : [{
    name   : "KP demo client",
    script : "yarn start",
    env_production: {
      GP_CLIENT_ID: "1693740873",
      GP_GO_ID: "8169154323",
      GP_SECRET_ID: "933V3mFV",
      APP_API: "https://strapi.kralovska-pece.cz",
      APP_DOMAIN: "https://kralovska-pece.cz",
      PAY_API: "https://gate.gopay.cz",
      SENDGRID_API_KEY: "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",
    }
  }],

  deploy : {
    production : {
      user : 'dimi',
      host : ['89.221.216.23'],
      ref  : 'origin/main',
      repo : 'git@github.com:simon1400/kp-client.git',
      path : '/var/www/kralovska-pece/client-demo',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
