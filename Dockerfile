FROM nginx:latest
EXPOSE 8080

COPY app/auth/nginx.conf /etc/nginx/conf.d/default.conf
COPY app/auth/.htpasswd  /etc/nginx/.htpasswd
COPY app/auth/index.html /usr/share/nginx/html/hc/index.html

CMD ["nginx", "-g", "daemon off;"]