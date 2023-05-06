FROM node:18.16.0
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8081
CMD [ "node", "server.js" ]