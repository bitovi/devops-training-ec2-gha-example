FROM nginx:latest as auth
ENV AUTH_PORT=8080
EXPOSE $AUTH_PORT

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.htpasswd  /etc/nginx/.htpasswd
COPY ./index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]
