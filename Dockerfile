FROM node:12.7-alpine AS build

RUN npm install -g yarn

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build --prod

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/play-on /usr/share/nginx/html
