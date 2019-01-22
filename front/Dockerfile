FROM node:10.15 as builder
COPY . /code
WORKDIR /code
RUN npm install -g yarn
RUN npm cache --force clean
RUN yarn install
RUN yarn build

FROM nginx:latest
COPY --from=builder /code/build /app
COPY ./docker/nginx/site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
