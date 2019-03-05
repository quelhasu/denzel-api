FROM node:10-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 9292

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node server.js