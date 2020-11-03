FROM node:alpine
RUN mkdir -p /home/node/app/client && chown -R node:node /home/node/app
WORKDIR /home/node/app

RUN apk update && apk add npm python g++ make && rm -rf /var/cache/apk/*

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node client/package*.json ./client/


RUN npm install --only=prod
RUN cd ./client && npm install --only=prod

COPY --chown=node:node . .

RUN npm run build
RUN rm -rf client

ENV GOOGLE_APPLICATION_CREDENTIALS=/home/node/app/api/config/firebase-service-secret.json
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]