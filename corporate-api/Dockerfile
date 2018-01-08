FROM mhart/alpine-node:latest
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api/
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]
