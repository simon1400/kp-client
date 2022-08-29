module.exports = {
  apps : [{
    name   : "Kralovska pece client",
    script : "yarn start",
    env_production: {
      GP_CLIENT_ID: "1693740873",
      GP_GO_ID: "8169154323",
      GP_SECRET_ID: "933V3mFV",
      APP_API: "http://kp-strapi-demo.hardart.cz",
      APP_DOMAIN: "http://kp-demo.hardart.cz",
      PAY_API: "https://gate.gopay.cz",
      SENDGRID_API_KEY: "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",
    }
  }],

  deploy : {
    production : {
      user : 'dimi',
      host : ['89.221.216.23'],
      ref  : 'origin/main',
      repo : 'git@github.com:simon1400/kralovska-pece.git',
      path : '/var/www/kralovska-pece/client-demo',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
