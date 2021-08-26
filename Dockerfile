
FROM node:12-alpine

RUN mkdir -p /var/www/kralovska-pece/client/node_modules && chown -R node:node /var/www/kralovska-pece/client

WORKDIR /var/www/kralovska-pece/client

COPY package*.json ./
RUN yarn install
COPY --chown=node:node . .

RUN yarn build

EXPOSE 3005

CMD [ "npm", "start" ]
