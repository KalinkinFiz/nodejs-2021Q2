FROM node:14.15-alpine

WORKDIR /app
COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]