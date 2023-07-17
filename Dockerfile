FROM node:14 as base

FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["npm","start"]

FROM base as development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","run","start-dev"]
#CMD ["npm","start"]
#CMD ["npm","run","start-dev"] // we use it in docker-compose