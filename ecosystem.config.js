module.exports = {
  apps : [{
    name   : "KP demo client",
    script : "yarn start"
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
