# build stage
FROM node:18 AS build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# nginx stage
FROM nginx:alpine
RUN mkdir -p /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf/default.conf /etc/nginx/conf.d/default.conf
