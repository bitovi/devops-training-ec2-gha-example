ENV AUTH_PORT=8080

FROM nginx:latest as auth
EXPOSE $AUTH_PORT

COPY app/auth/nginx.conf /etc/nginx/conf.d/default.conf
COPY app/auth/.htpasswd  /etc/nginx/.htpasswd
COPY app/auth/index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]
