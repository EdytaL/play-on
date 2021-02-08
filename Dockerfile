FROM node:12.7-alpine as build-stage

RUN npm install -g yarn

ARG PORT

WORKDIR /tmp

COPY package*.json ./ yarn.lock ./

RUN yarn install

RUN echo $PORT

WORKDIR /usr/src/app

COPY . .

RUN npm run build

# Stage 2
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

