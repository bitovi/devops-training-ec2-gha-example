FROM nginx:latest
EXPOSE 8080

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.htpasswd  /etc/nginx/.htpasswd
COPY ./index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]