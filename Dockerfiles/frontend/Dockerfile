FROM node:20

WORKDIR /app

COPY ./account-react/package*.json ./
RUN npm install

COPY ./account-react .
RUN npm run build
