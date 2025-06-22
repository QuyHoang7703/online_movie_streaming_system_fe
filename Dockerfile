FROM node:22 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# ❗️Copy file chứng chỉ SSL vào đúng nơi
COPY emovie.io.vn.crt /etc/nginx/ssl/emovie.io.vn.crt
COPY emovie.io.vn.key /etc/nginx/ssl/emovie.io.vn.key

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

