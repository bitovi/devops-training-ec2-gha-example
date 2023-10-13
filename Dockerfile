FROM nginx:latest
EXPOSE 8080

COPY ./app/default.conf /etc/nginx/conf.d/default.conf
COPY ./app/.htpasswd  /etc/nginx/.htpasswd
COPY ./app/index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]