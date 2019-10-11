FROM node:current-alpine

WORKDIR /app

COPY ./app /app

RUN ["npm", "install"]

CMD ["npm", "run", "dev"]
