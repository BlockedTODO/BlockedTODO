FROM node:12.16.3-alpine

RUN mkdir -p /backend
WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
