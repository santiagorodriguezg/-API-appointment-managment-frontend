FROM node:14-buster AS bulider

WORKDIR /code

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build


# NGINX Web server
FROM nginx:alpine AS prod

COPY --from=bulider /code/build /usr/share/nginx/html
EXPOSE 80
CMD ["ngnix", "-g", "daemon off;"]

