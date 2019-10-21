FROM node:current-alpine

RUN apk update

RUN apk add bash iptables

WORKDIR /app

COPY ./app /app

RUN ["npm", "install"]

EXPOSE 3000

CMD ["npm", "run", "dev"]
