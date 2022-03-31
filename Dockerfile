
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
RUN mkdir -p /var/www/kralovska-pece/client/node_modules && chown -R node:node /var/www/kralovska-pece/client

WORKDIR /var/www/kralovska-pece/client

COPY package*.json ./
RUN npm install
COPY --chown=node:node . .

RUN npm run build

EXPOSE 3005

CMD [ "npm", "start" ]
