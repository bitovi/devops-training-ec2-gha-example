FROM node:19
WORKDIR /app 
COPY package.json /app 
COPY package-lock.json /app
RUN npm install
COPY . /app 
CMD npm run storybook
EXPOSE 6006