FROM node:16.15.0-alpine

# Las variables de entorno se pueden establecer aqui o en docker-compose.yml:
# ENV NODE_ENV=production
# ENV MONGODB_CONNECTION_STRING=mongodb://username:password@mongo-container:27017/tfm
# ENV PORT=3000

WORKDIR /

COPY ["package.json", "tsconfig.json", "./"]

COPY ./src ./src

RUN npm install

RUN npm run build:prod

EXPOSE 3000

RUN mkdir -p ./logs
#RUN mkdir -p ./ssl


# No usamos el USER node para usar el user ROOT que tiene permisos para realizar cualquier operación (menos seguro)
# RUN chown -R node:node ./logs
# RUN chown -R node:node ./ssl
# USER node

CMD [ "node", "./dist/prod/index.js" ]