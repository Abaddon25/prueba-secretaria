FROM node:14.15 as base 

WORKDIR /app
RUN npm install -g @angular/cli


# Build dev
FROM base as dev
CMD [ "ng", "serve", "--host", "0.0.0.0" ]


#Build prod
FROM base as prod-base
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/out

FROM nginx as prod
COPY --from=prod-base /app/dist/out/ /usr/share/nginx/html
COPY --from=prod-base /app/nginx.conf /etc/nginx/conf.d/default.conf