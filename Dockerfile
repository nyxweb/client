FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
