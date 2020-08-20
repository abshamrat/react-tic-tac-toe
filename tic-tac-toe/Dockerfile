FROM node:12

RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 8080

CMD ["npm run start:dev"]
ENTRYPOINT [ "sh", "-c" ]