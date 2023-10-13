FROM alpine AS base

RUN apk update && apk add npm nodejs~=18 git

ENV BACKEND_PORT=3001
ENV FRONTEND_PORT=3000
ENV AUTH_PORT=8080

WORKDIR app
COPY . .
COPY package.json .

RUN npm install

FROM base AS backend
EXPOSE $BACKEND_PORT
CMD npm run dev:backend

FROM base AS frontend
EXPOSE $FRONTEND_PORT
CMD npm run dev:frontend

FROM nginx:latest as auth
EXPOSE $AUTH_PORT

COPY temp-auth/nginx.conf /etc/nginx/conf.d/default.conf
COPY temp-auth/.htpasswd  /etc/nginx/.htpasswd
COPY temp-auth/index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]
